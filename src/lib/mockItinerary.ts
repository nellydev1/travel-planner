import { ItinerarySchema, type Itinerary, type ItineraryDay, type TripRequest } from "./itinerary";

// Fake itinerary for developing the UI without an API key (USE_MOCK_DATA=true).

const MOCK_DELAY_MS = 1500;

type Template = { title: string; description: string };

const DAY_THEMES = [
  "Arrival & First Impressions",
  "Historic Heart of the City",
  "Markets, Flavors & Street Life",
  "Into the Countryside",
  "Art, Museums & Hidden Courtyards",
  "Coastline & Scenic Views",
  "Local Neighborhoods",
  "Day Trip Adventure",
  "Slow Morning & Sunset Spots",
  "Farewell Favorites",
];

const MORNING: Template[] = [
  { title: "Old Town walking tour", description: "Wander cobbled lanes and learn the city's story from a local guide." },
  { title: "Sunrise viewpoint hike", description: "Beat the crowds with a short climb to a panoramic lookout." },
  { title: "Central market visit", description: "Browse fresh produce and grab a pastry with the early risers." },
  { title: "National museum", description: "Get a crash course in the region's history and culture." },
  { title: "Botanical garden stroll", description: "A calm start among native plants and shady paths." },
];

const AFTERNOON: Template[] = [
  { title: "Cathedral & main square", description: "See the city's landmark architecture and people-watch from a café." },
  { title: "Cooking class", description: "Learn to make two or three classic local dishes, then eat them." },
  { title: "Countryside day trip", description: "Take the train out to rolling hills and a small village." },
  { title: "Riverside bike ride", description: "Rent a bike and follow the water past parks and bridges." },
  { title: "Artisan quarter", description: "Pop into workshops for handmade crafts and souvenirs." },
];

const EVENING: Template[] = [
  { title: "Sunset rooftop drinks", description: "Watch the skyline glow over a local drink." },
  { title: "Live music night", description: "Catch traditional or contemporary music in an intimate venue." },
  { title: "Night food market", description: "Graze on street food stalls and sweet treats." },
  { title: "Historic district by night", description: "The old streets look magical when lit up after dark." },
  { title: "Dinner with a view", description: "Book a table at a terrace restaurant overlooking the city." },
];

const FOOD_TIPS = [
  "Try the signature street snack from a busy stall - long lines are a good sign.",
  "Order the regional stew at a family-run tavern near the market.",
  "Stop at a bakery for the local morning pastry with strong coffee.",
  "Look for the day's set lunch menu - great value and very local.",
  "Finish the day with the classic local dessert.",
];

const pick = <T>(list: T[], i: number) => list[i % list.length];

function mockDay(dayNumber: number, destination: string): ItineraryDay {
  const i = dayNumber - 1;
  return {
    day: dayNumber,
    title: pick(DAY_THEMES, i),
    location: i % 4 === 3 ? `Countryside outside ${destination}` : destination,
    activities: [
      { timeOfDay: "morning", ...pick(MORNING, i) },
      { timeOfDay: "afternoon", ...pick(AFTERNOON, i + 2) },
      { timeOfDay: "evening", ...pick(EVENING, i + 1) },
    ],
    foodTip: pick(FOOD_TIPS, i),
  };
}

export async function generateMockItinerary({
  destination,
  days,
  interests,
}: TripRequest): Promise<Itinerary> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  const name = destination.charAt(0).toUpperCase() + destination.slice(1);
  const focus = interests.length ? ` with a focus on ${interests.join(", ").toLowerCase()}` : "";

  // Validate against the real schema so the mock can't drift from what Claude returns.
  return ItinerarySchema.parse({
    isValidDestination: true,
    destination: name,
    summary: `A ${days}-day sample trip through ${name}${focus}. This is mock data - add an API key to get a real plan.`,
    bestTimeToVisit: "Spring (April-June) or early autumn (September-October)",
    currency: "Local currency (mock)",
    days: Array.from({ length: days }, (_, i) => mockDay(i + 1, name)),
    tips: [
      "Buy a transit day pass if you plan to hop between neighborhoods.",
      "Carry some cash for small shops and markets.",
      "Book popular museums online a few days ahead.",
      "Learn a few phrases in the local language - people appreciate it.",
    ],
  });
}
