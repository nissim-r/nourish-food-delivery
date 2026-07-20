import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { CATEGORIES, searchRestaurants } from "~/data/restaurants";
import { RestaurantCard } from "~/components/RestaurantCard";
import { EmptyState } from "~/components/EmptyState";

export const Route = createFileRoute("/search")({
  component: SearchPage,
});

function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const results = useMemo(
    () => searchRestaurants(query, category),
    [query, category],
  );

  return (
    <div className="animate-fade-up">
      <header className="sticky top-0 z-20 border-b border-cream-300/60 bg-cream-50/90 px-4 pb-3 pt-4 backdrop-blur-lg">
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">
          Search
        </h1>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-charcoal-700/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Restaurants, dishes, cuisines…"
            autoFocus
            className="min-h-[48px] w-full rounded-2xl border border-cream-300/80 bg-white py-3 pl-11 pr-11 text-sm text-charcoal-900 shadow-card outline-none transition placeholder:text-charcoal-700/40 focus:border-coral-300 focus:ring-2 focus:ring-coral-200/60"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-charcoal-700/50 hover:bg-cream-100"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="chip-scroll -mx-4 mt-3 flex gap-2 overflow-x-auto px-4">
          {CATEGORIES.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`pressable flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition ${
                  active
                    ? "bg-coral-500 text-white"
                    : "bg-white text-charcoal-800 shadow-card"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            );
          })}
        </div>
      </header>

      <main className="px-4 py-5">
        {results.length === 0 ? (
          <EmptyState
            emoji="🔍"
            title="No matches"
            description={
              query
                ? `Nothing found for “${query}”. Try another dish or cuisine.`
                : "Try a category or search for sushi, tacos, pasta…"
            }
            actionLabel="Browse home"
            actionTo="/"
          />
        ) : (
          <>
            <p className="mb-3 text-xs font-medium text-charcoal-700/55">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
            <div className="flex flex-col gap-3">
              {results.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
