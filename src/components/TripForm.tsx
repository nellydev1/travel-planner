"use client";

import { useState, type FormEvent } from "react";
import { INTERESTS, MAX_DAYS, type TripRequest } from "@/lib/itinerary";
import { citiesOf, findDestination, type Destination } from "@/lib/destinations";
import DestinationPicker from "./DestinationPicker";
import Flag from "./Flag";
import styles from "./TripForm.module.css";

const POPULAR = ["Japan", "Paris, France", "Italy", "Bali, Indonesia", "Portugal", "Yerevan, Armenia"]
  .map(findDestination)
  .filter((d): d is Destination => d !== undefined);

type Props = {
  onSubmit: (request: TripRequest) => void;
  loading: boolean;
};

export default function TripForm({ onSubmit, loading }: Props) {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(5);
  const [interests, setInterests] = useState<TripRequest["interests"]>([]);

  // Once a destination is picked, offer that country's popular cities instead.
  const selected = findDestination(destination);
  const cities = selected ? citiesOf(selected.country) : [];

  const toggleInterest = (interest: TripRequest["interests"][number]) =>
    setInterests((current) =>
      current.includes(interest) ? current.filter((i) => i !== interest) : [...current, interest],
    );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    onSubmit({ destination, days, interests });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="destination" className={styles.label}>
          Where do you want to go?
        </label>
        <DestinationPicker id="destination" value={destination} onChange={setDestination} />
        {!selected && (
          <div className={styles.suggestions}>
            <span className={styles.hint}>Popular:</span>
            {POPULAR.map((d) => (
              <button
                key={d.label}
                type="button"
                className={styles.suggestion}
                onClick={() => setDestination(d.label)}
              >
                <Flag code={d.code} /> {d.name}
              </button>
            ))}
          </div>
        )}
        {selected && cities.length > 0 && (
          <div className={styles.suggestions}>
            <span className={styles.hint}>Popular in {selected.country}:</span>
            {selected.type === "city" && (
              <button
                type="button"
                className={styles.suggestion}
                onClick={() => setDestination(selected.country)}
              >
                <Flag code={selected.code} /> Whole country
              </button>
            )}
            {cities.map((city) => {
              const active = city.label === destination;
              return (
                <button
                  key={city.label}
                  type="button"
                  className={`${styles.suggestion} ${active ? styles.suggestionActive : ""}`}
                  aria-pressed={active}
                  onClick={() => setDestination(city.label)}
                >
                  {city.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.field}>
        <span className={styles.label} id="days-label">
          How many days?
        </span>
        <div className={styles.stepper} role="group" aria-labelledby="days-label">
          <button
            type="button"
            className={styles.stepButton}
            onClick={() => setDays((d) => Math.max(1, d - 1))}
            disabled={days <= 1}
            aria-label="Fewer days"
          >
            −
          </button>
          <output className={styles.dayCount} aria-live="polite">
            {days} {days === 1 ? "day" : "days"}
          </output>
          <button
            type="button"
            className={styles.stepButton}
            onClick={() => setDays((d) => Math.min(MAX_DAYS, d + 1))}
            disabled={days >= MAX_DAYS}
            aria-label="More days"
          >
            +
          </button>
        </div>
      </div>

      <fieldset className={styles.field}>
        <legend className={styles.label}>
          What do you enjoy? <span className={styles.optional}>(optional)</span>
        </legend>
        <div className={styles.chips}>
          {INTERESTS.map((interest) => {
            const active = interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                className={`${styles.chip} ${active ? styles.chipActive : ""}`}
                aria-pressed={active}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </fieldset>

      <button type="submit" className={styles.submit} disabled={loading || !destination}>
        {loading ? "Planning your trip…" : "Plan my trip ✈️"}
      </button>
    </form>
  );
}
