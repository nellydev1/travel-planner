"use client";

import { useEffect, useRef, useState } from "react";
import TripForm from "@/components/TripForm";
import DayCard from "@/components/DayCard";
import Flag from "@/components/Flag";
import { findDestination } from "@/lib/destinations";
import type { Itinerary, TripRequest } from "@/lib/itinerary";
import styles from "./page.module.css";

const LOADING_MESSAGES = [
  "Scouting the best neighborhoods…",
  "Finding hidden gems…",
  "Checking out local food spots…",
  "Balancing sightseeing and rest…",
  "Putting the finishing touches on your plan…",
];

export default function Home() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [lastRequest, setLastRequest] = useState<TripRequest | null>(null);
  const resultsRef = useRef<HTMLElement>(null);

  const planTrip = async (request: TripRequest) => {
    setLoading(true);
    setError(null);
    setItinerary(null);
    setLastRequest(request);
    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setIsMock(res.headers.get("X-Mock-Data") === "true");
      setItinerary(data as Itinerary);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading || itinerary || error) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loading, itinerary, error]);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>AI trip planner</p>
        <h1 className={styles.heading}>Plan your next adventure in seconds</h1>
        <p className={styles.subheading}>
          Tell us where you&apos;re going and for how long. We&apos;ll build a day-by-day
          itinerary around what you love.
        </p>
      </header>

      <main className={styles.main}>
        <TripForm onSubmit={planTrip} loading={loading} />

        <section ref={resultsRef} className={styles.results} aria-live="polite">
          {loading && <LoadingState days={lastRequest?.days ?? 3} />}

          {error && (
            <div className={styles.error} role="alert">
              <p>{error}</p>
              {lastRequest && (
                <button className={styles.secondaryButton} onClick={() => planTrip(lastRequest)}>
                  Try again
                </button>
              )}
            </div>
          )}

          {itinerary && isMock && (
            <p className={styles.mockBanner}>
              🧪 Demo mode: this is mock data. Set ANTHROPIC_API_KEY and remove USE_MOCK_DATA
              to get real AI plans.
            </p>
          )}
          {itinerary && (
            <ItineraryView
              itinerary={itinerary}
              flagCode={lastRequest && findDestination(lastRequest.destination)?.code}
            />
          )}
        </section>
      </main>

      <footer className={styles.footer}>Built with Next.js and the Claude API</footer>
    </div>
  );
}

function ItineraryView({ itinerary, flagCode }: { itinerary: Itinerary; flagCode?: string | null }) {
  return (
    <>
      <div className={styles.overview}>
        <h2 className={styles.overviewTitle}>
          {flagCode && <Flag code={flagCode} size="lg" />}{" "}
          {itinerary.days.length} {itinerary.days.length === 1 ? "day" : "days"} in{" "}
          {itinerary.destination}
        </h2>
        <p className={styles.summary}>{itinerary.summary}</p>
        <div className={styles.facts}>
          <span>🗓️ Best time: {itinerary.bestTimeToVisit}</span>
          <span>💰 Currency: {itinerary.currency}</span>
        </div>
      </div>

      <div className={styles.grid}>
        {itinerary.days.map((day) => (
          <DayCard key={day.day} day={day} />
        ))}
      </div>

      {itinerary.tips.length > 0 && (
        <aside className={styles.tips}>
          <h3>Travel tips</h3>
          <ul>
            {itinerary.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </aside>
      )}
    </>
  );
}

function LoadingState({ days }: { days: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % LOADING_MESSAGES.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.loading}>
      <div className={styles.loadingHeader}>
        <span className={styles.plane} aria-hidden>
          ✈️
        </span>
        <p>{LOADING_MESSAGES[index]}</p>
      </div>
      <div className={styles.grid}>
        {Array.from({ length: Math.min(days, 6) }, (_, i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    </div>
  );
}
