import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { ItinerarySchema, type Itinerary, type TripRequest } from "./itinerary";

// Reads ANTHROPIC_API_KEY from the environment (.env.local in development).
const client = new Anthropic();

const SYSTEM_PROMPT = `You are an expert travel planner. Build realistic day-by-day itineraries:
- Group nearby sights on the same day and keep travel time between cities reasonable.
- Give each day a morning, afternoon, and evening activity.
- Mix famous highlights with local, lesser-known spots.
- Tailor the plan to the traveler's interests when given.
- If the destination is not a real place, set isValidDestination to false and return an empty days array.`;

export class ItineraryError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export async function generateItinerary({
  destination,
  days,
  interests,
}: TripRequest): Promise<Itinerary> {
  const interestLine = interests.length
    ? `Traveler interests: ${interests.join(", ")}.`
    : "No specific interests - give a well-rounded trip.";

  const response = await client.beta.messages.parse({
    model: "claude-opus-5",
    max_tokens: 16000,
    output_config: {
      effort: "medium",
      format: betaZodOutputFormat(ItinerarySchema),
    },
    // Retry on another model server-side if a safety classifier declines.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Plan a ${days}-day trip to: ${destination}\n${interestLine}\nReturn exactly ${days} days, numbered from 1.`,
      },
    ],
  });

  if (response.stop_reason === "refusal") {
    throw new ItineraryError("Sorry, we can't plan a trip for that request.", 422);
  }
  if (response.stop_reason === "max_tokens" || !response.parsed_output) {
    throw new ItineraryError("The plan came back incomplete. Please try again.", 502);
  }

  const itinerary = response.parsed_output;
  if (!itinerary.isValidDestination) {
    throw new ItineraryError(
      `We couldn't recognize "${destination}" as a destination. Try a country or city name.`,
      422,
    );
  }
  return itinerary;
}
