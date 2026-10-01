# Trip Planner

An AI travel planner built with **Next.js (App Router), React, TypeScript, and CSS Modules**.
Enter a destination and the number of days (optionally pick your interests), and Claude
generates a day-by-day itinerary that renders as a card for each day.

## How it works

- `src/app/page.tsx` – client UI: form, loading state, itinerary cards
- `src/app/api/itinerary/route.ts` – POST endpoint; validates input with Zod and maps errors to friendly messages
- `src/lib/claude.ts` – calls the Claude API (server-only, so the API key never reaches the browser)
- `src/lib/itinerary.ts` – shared Zod schemas for the request and the itinerary

The itinerary uses **structured outputs**: the Zod `ItinerarySchema` is passed to
`client.beta.messages.parse()` via `betaZodOutputFormat`, so Claude's response is guaranteed to
match the schema and comes back already parsed and typed. The request also enables server-side
refusal fallbacks (`fallbacks: "default"`).

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your Anthropic API key to `.env.local` (this file is git-ignored; `.env.example` shows the format):
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```
3. Run the dev server and open http://localhost:3000:
   ```bash
   npm run dev
   ```

### Mock mode (no API key needed)

Set `USE_MOCK_DATA=true` in `.env.local` to get fake itineraries from `src/lib/mockItinerary.ts`
instead of calling Claude. The mock waits about 1.5 seconds so you still see the loading state, and the page shows a
"Demo mode" banner. Remove the line (or set it to `false`) once you add your key, then restart
the dev server.

## Deploying

Set `ANTHROPIC_API_KEY` as an environment variable on your host (e.g. Vercel → Project Settings →
Environment Variables). The API route sets `maxDuration = 120` because long trips can take a
while to generate.

Because every request spends API credits, consider adding rate limiting before sharing the URL
publicly (and set a monthly spend limit in the Claude Console).
