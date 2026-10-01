import { z } from "zod";
import { isKnownDestination } from "./destinations";

// Shared between the API route (validates Claude's output) and the UI (types).

export const MAX_DAYS = 14;

export const INTERESTS = [
  "Culture & history",
  "Food & drink",
  "Nature & outdoors",
  "Beaches",
  "Nightlife",
  "Shopping",
  "Art & museums",
  "Adventure",
  "Relaxation",
  "Family-friendly",
] as const;

export const TripRequestSchema = z.object({
  destination: z.string().refine(isKnownDestination, "Pick a destination from the list"),
  days: z.number().int().min(1).max(MAX_DAYS),
  interests: z.array(z.enum(INTERESTS)).max(INTERESTS.length).default([]),
});
export type TripRequest = z.infer<typeof TripRequestSchema>;

const ActivitySchema = z.object({
  timeOfDay: z.enum(["morning", "afternoon", "evening"]),
  title: z.string().describe("Short name of the activity or place"),
  description: z.string().describe("One or two sentences on what to do and why it's worth it"),
});

const DaySchema = z.object({
  day: z.number().int().describe("Day number, starting at 1"),
  title: z.string().describe("Catchy theme for the day, e.g. 'Old Town & Riverside'"),
  location: z.string().describe("City or area where the day takes place"),
  activities: z.array(ActivitySchema),
  foodTip: z.string().describe("A local dish or eatery to try that day"),
});

export const ItinerarySchema = z.object({
  isValidDestination: z
    .boolean()
    .describe("False if the input is not a real country, region, or city"),
  destination: z.string().describe("Properly formatted destination name"),
  summary: z.string().describe("Two-sentence overview of the trip"),
  bestTimeToVisit: z.string(),
  currency: z.string(),
  days: z.array(DaySchema),
  tips: z.array(z.string()).describe("3-5 practical travel tips"),
});
export type Itinerary = z.infer<typeof ItinerarySchema>;
export type ItineraryDay = z.infer<typeof DaySchema>;
