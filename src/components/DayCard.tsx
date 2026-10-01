import type { ItineraryDay } from "@/lib/itinerary";
import styles from "./DayCard.module.css";

const TIME_ICONS = { morning: "🌅", afternoon: "☀️", evening: "🌙" } as const;

export default function DayCard({ day }: { day: ItineraryDay }) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={styles.badge}>Day {day.day}</span>
        <span className={styles.location}>📍 {day.location}</span>
      </header>
      <h3 className={styles.title}>{day.title}</h3>

      <ol className={styles.timeline}>
        {day.activities.map((activity, i) => (
          <li key={i} className={styles.activity}>
            <span className={styles.icon} aria-hidden>
              {TIME_ICONS[activity.timeOfDay]}
            </span>
            <div>
              <p className={styles.time}>{activity.timeOfDay}</p>
              <p className={styles.activityTitle}>{activity.title}</p>
              <p className={styles.description}>{activity.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className={styles.food}>
        <span aria-hidden>🍽️</span> {day.foodTip}
      </p>
    </article>
  );
}
