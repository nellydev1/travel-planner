"use client";

import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  findDestination,
  normalize,
  searchDestinations,
  type Destination,
} from "@/lib/destinations";
import Flag from "./Flag";
import styles from "./DestinationPicker.module.css";

type Props = {
  id: string;
  /** Selected destination label, or "" when nothing is selected. */
  value: string;
  onChange: (label: string) => void;
};

export default function DestinationPicker({ id, value, onChange }: Props) {
  const listId = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Show the selection when there is one, otherwise whatever the user is typing.
  const text = value || query;
  const selected = value ? findDestination(value) : undefined;
  const results = useMemo(() => searchDestinations(value ? "" : query), [value, query]);

  const select = (destination: Destination) => {
    onChange(destination.label);
    setQuery(destination.label);
    setOpen(false);
  };

  const moveActive = (index: number) => {
    setActiveIndex(index);
    listRef.current?.children[index]?.scrollIntoView({ block: "nearest" });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        else moveActive(Math.min(activeIndex + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        moveActive(Math.max(activeIndex - 1, 0));
        break;
      case "Enter":
        if (open && results[activeIndex]) {
          e.preventDefault();
          select(results[activeIndex]);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  const handleBlur = () => {
    setOpen(false);
    // Accept an exact (case/accent-insensitive) match typed without picking from the list.
    if (!value && query) {
      const exact = searchDestinations(query).find(
        (d) => normalize(d.label) === normalize(query) || normalize(d.name) === normalize(query),
      );
      if (exact) select(exact);
    }
  };

  const clear = () => {
    onChange("");
    setQuery("");
    setOpen(true);
    setActiveIndex(0);
  };

  const showHint = !open && !value && query.length > 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputRow}>
        <span className={styles.searchIcon} aria-hidden>
          {selected ? <Flag code={selected.code} /> : "🔍"}
        </span>
        <input
          id={id}
          className={styles.input}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && results[activeIndex] ? `${listId}-${activeIndex}` : undefined}
          placeholder="Search a country or city…"
          value={text}
          onChange={(e) => {
            if (value) onChange("");
            setQuery(e.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
        />
        {text && (
          <button type="button" className={styles.clear} onClick={clear} aria-label="Clear destination">
            ×
          </button>
        )}
      </div>

      {open && (
        <ul ref={listRef} id={listId} role="listbox" className={styles.list}>
          {results.length === 0 ? (
            <li className={styles.empty}>No destinations match &ldquo;{query}&rdquo;</li>
          ) : (
            results.map((d, i) => (
              <li
                key={d.label}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === activeIndex}
                className={`${styles.option} ${i === activeIndex ? styles.active : ""}`}
                // mousedown fires before the input's blur, so the click isn't lost.
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(d);
                }}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <Flag code={d.code} />
                <span className={styles.name}>
                  {d.type === "city" && <span aria-hidden>🏙️ </span>}
                  {d.name}
                </span>
                <span className={styles.meta}>{d.type === "country" ? "Country" : d.country}</span>
              </li>
            ))
          )}
        </ul>
      )}

      {showHint && <p className={styles.hint}>Please choose a destination from the list.</p>}
    </div>
  );
}
