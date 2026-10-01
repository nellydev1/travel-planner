import Anthropic from "@anthropic-ai/sdk";
import { generateItinerary, ItineraryError } from "@/lib/claude";
import { TripRequestSchema } from "@/lib/itinerary";
import { generateMockItinerary } from "@/lib/mockItinerary";

// Long itineraries can take a while to generate.
export const maxDuration = 120;

// Set USE_MOCK_DATA=true in .env.local to develop the UI without an API key.
const useMockData = process.env.USE_MOCK_DATA === "true";

export async function POST(request: Request) {
  if (!useMockData && !process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set - add it to .env.local and restart the server");
    return Response.json({ error: "The server is not configured correctly." }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = TripRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Please pick a destination from the list and a number of days between 1 and 14." },
      { status: 400 },
    );
  }

  if (useMockData) {
    const itinerary = await generateMockItinerary(parsed.data);
    return Response.json(itinerary, { headers: { "X-Mock-Data": "true" } });
  }

  try {
    const itinerary = await generateItinerary(parsed.data);
    return Response.json(itinerary);
  } catch (error) {
    if (error instanceof ItineraryError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic authentication failed - check ANTHROPIC_API_KEY");
      return Response.json({ error: "The server is not configured correctly." }, { status: 500 });
    }
    if (error instanceof Anthropic.RateLimitError) {
      return Response.json(
        { error: "Too many requests right now. Please wait a moment and try again." },
        { status: 429 },
      );
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`Anthropic API error ${error.status}:`, error.message);
      return Response.json(
        { error: "The trip planner is unavailable right now. Please try again." },
        { status: 502 },
      );
    }
    console.error(error);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
