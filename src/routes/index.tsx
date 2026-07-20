import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, ChevronDown, Search, Sparkles } from "lucide-react";
import {
  CATEGORIES,
  getFeatured,
  restaurants,
  searchRestaurants,
} from "~/data/restaurants";
import { RestaurantCard } from "~/components/RestaurantCard";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [category, setCategory] = useState("all");
  const featured = useMemo(() => getFeatured(), []);
  const filtered = useMemo(
    () => searchRestaurants("", category),
    [category],
  );

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-cream-300/60 bg-cream-50/90 px-4 pb-3 pt-4 backdrop-blur-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-coral-600">
              Deliver to
            </p>
            <button
              type="button"
              className="mt-0.5 flex min-h-[44px] items-center gap-1.5 text-left"
            >
              <MapPin className="h-4 w-4 shrink-0 text-coral-500" />
              <span className="font-display text-lg font-semibold text-charcoal-900">
                124 Market Street
              </span>
              <ChevronDown className="h-4 w-4 text-charcoal-700/50" />
            </button>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-coral-400 to-coral-600 text-lg shadow-card">
            🍽️
          </div>
        </div>

        <Link
          to="/search"
          className="mt-2 flex min-h-[48px] items-center gap-3 rounded-2xl border border-cream-300/80 bg-white px-4 text-charcoal-700/50 shadow-card transition hover:border-coral-200"
        >
          <Search className="h-4.5 w-4.5 text-charcoal-700/40" />
          <span className="text-sm">Search dishes, restaurants…</span>
        </Link>
      </header>

      <main className="px-4 pb-4 pt-5">
        {/* Hero banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-coral-500 via-coral-600 to-coral-800 p-5 text-white shadow-float">
          <div className="absolute -right-4 -top-4 text-8xl opacity-20">🥗</div>
          <div className="absolute -bottom-6 right-8 text-6xl opacity-15">🍕</div>
          <div className="relative z-10 max-w-[70%]">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Tonight only
            </div>
            <h1 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              Cravings, curated.
            </h1>
            <p className="mt-1.5 text-sm text-white/80">
              Free delivery on orders over $30 from featured spots.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-6">
          <div className="chip-scroll -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            {CATEGORIES.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`pressable flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold transition ${
                    active
                      ? "bg-charcoal-900 text-white shadow-card"
                      : "bg-white text-charcoal-800 shadow-card hover:bg-cream-50"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Featured */}
        {category === "all" && (
          <section className="mt-7">
            <div className="mb-3 flex items-end justify-between">
              <h2 className="font-display text-xl font-semibold text-charcoal-900">
                Featured near you
              </h2>
              <span className="text-xs font-medium text-coral-600">
                {featured.length} picks
              </span>
            </div>
            <div className="chip-scroll -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
              {featured.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} compact />
              ))}
            </div>
          </section>
        )}

        {/* All / filtered list */}
        <section className="mt-7">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="font-display text-xl font-semibold text-charcoal-900">
              {category === "all"
                ? "All restaurants"
                : CATEGORIES.find((c) => c.id === category)?.label}
            </h2>
            <span className="text-xs text-charcoal-700/55">
              {filtered.length} places
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {filtered.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
            {filtered.length === 0 && (
              <p className="rounded-2xl bg-white p-8 text-center text-sm text-charcoal-700/60 shadow-card">
                No restaurants in this category yet. Try another!
              </p>
            )}
          </div>
        </section>

        <p className="mt-8 text-center text-xs text-charcoal-700/40">
          {restaurants.length} restaurants · Nourish demo
        </p>
      </main>
    </div>
  );
}
