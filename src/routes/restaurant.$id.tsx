import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Bike,
  Clock,
  Flame,
  Leaf,
  Star,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { getRestaurant } from "~/data/restaurants";
import { formatMoney, useCartStore } from "~/store/cart";
import { QuantityControl } from "~/components/QuantityControl";

export const Route = createFileRoute("/restaurant/$id")({
  component: RestaurantPage,
});

function RestaurantPage() {
  const { id } = Route.useParams();
  const restaurant = getRestaurant(id);
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const cartRestaurantId = useCartStore((s) => s.getRestaurantId());
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const qtyMap = useMemo(() => {
    const m = new Map<string, number>();
    for (const i of items) m.set(i.id, i.quantity);
    return m;
  }, [items]);

  if (!restaurant) {
    return (
      <div className="flex flex-col items-center px-6 py-20 text-center">
        <p className="text-5xl">😕</p>
        <h1 className="mt-4 font-display text-xl font-semibold">
          Restaurant not found
        </h1>
        <Link
          to="/"
          className="mt-6 rounded-2xl bg-coral-500 px-6 py-3 text-sm font-semibold text-white"
        >
          Back home
        </Link>
      </div>
    );
  }

  const handleAdd = (item: {
    id: string;
    name: string;
    price: number;
    emoji: string;
  }) => {
    if (cartRestaurantId && cartRestaurantId !== restaurant.id) {
      toast.message("Cart updated", {
        description: `Switched to ${restaurant.name}. Previous items cleared.`,
      });
    }
    addItem({
      id: item.id,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      name: item.name,
      price: item.price,
      emoji: item.emoji,
    });
    toast.success(`Added ${item.name}`);
  };

  const sections = restaurant.menu;
  const currentSection = activeSection ?? sections[0]?.id;

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <div
        className={`relative flex h-52 items-center justify-center bg-gradient-to-br sm:h-60 ${restaurant.gradient}`}
      >
        <span className="text-8xl drop-shadow-lg">{restaurant.emoji}</span>
        <Link
          to="/"
          aria-label="Back"
          className="pressable absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-charcoal-900 shadow-card backdrop-blur"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        {restaurant.promo && (
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-charcoal-900/80 px-4 py-2.5 text-center text-sm font-medium text-white backdrop-blur">
            {restaurant.promo}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="-mt-4 rounded-t-3xl bg-cream-100 px-4 pt-5">
        <h1 className="font-display text-2xl font-bold text-charcoal-900 sm:text-3xl">
          {restaurant.name}
        </h1>
        <p className="mt-1 text-sm text-charcoal-700/70">
          {restaurant.cuisine.join(" · ")}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700/80">
          {restaurant.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-card">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {restaurant.rating} ({restaurant.reviewCount.toLocaleString()})
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-card">
            <Clock className="h-3.5 w-3.5 text-charcoal-700/50" />
            {restaurant.deliveryTime}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-card">
            <Bike className="h-3.5 w-3.5 text-charcoal-700/50" />
            {restaurant.deliveryFee === 0
              ? "Free delivery"
              : formatMoney(restaurant.deliveryFee)}
          </span>
        </div>

        {/* Section chips */}
        <div className="chip-scroll -mx-4 mt-6 flex gap-2 overflow-x-auto px-4">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActiveSection(s.id);
                document
                  .getElementById(`section-${s.id}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`pressable min-h-[40px] shrink-0 rounded-full px-3.5 text-xs font-semibold transition ${
                currentSection === s.id
                  ? "bg-charcoal-900 text-white"
                  : "bg-white text-charcoal-800 shadow-card"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Menu */}
        <div className="mt-6 space-y-8 pb-8">
          {sections.map((section) => (
            <section key={section.id} id={`section-${section.id}`}>
              <h2 className="font-display text-lg font-semibold text-charcoal-900">
                {section.name}
              </h2>
              <div className="mt-3 space-y-3">
                {section.items.map((item) => {
                  const qty = qtyMap.get(item.id) ?? 0;
                  return (
                    <article
                      key={item.id}
                      className="flex gap-3 rounded-2xl bg-white p-3.5 shadow-card"
                    >
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-cream-100 text-3xl">
                        {item.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-charcoal-900">
                            {item.name}
                          </h3>
                          <span className="shrink-0 font-semibold tabular-nums text-charcoal-900">
                            {formatMoney(item.price)}
                          </span>
                        </div>
                        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-charcoal-700/65">
                          {item.description}
                        </p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1">
                            {item.popular && (
                              <span className="rounded-full bg-coral-50 px-2 py-0.5 text-[10px] font-semibold text-coral-700">
                                Popular
                              </span>
                            )}
                            {item.veg && (
                              <span className="inline-flex items-center gap-0.5 rounded-full bg-sage-500/10 px-2 py-0.5 text-[10px] font-semibold text-sage-600">
                                <Leaf className="h-2.5 w-2.5" /> Veg
                              </span>
                            )}
                            {item.spicy && (
                              <span className="inline-flex items-center gap-0.5 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
                                <Flame className="h-2.5 w-2.5" /> Spicy
                              </span>
                            )}
                          </div>
                          {qty > 0 ? (
                            <QuantityControl
                              value={qty}
                              size="sm"
                              onChange={(n) => updateQuantity(item.id, n)}
                            />
                          ) : (
                            <button
                              type="button"
                              aria-label={`Add ${item.name}`}
                              onClick={() => handleAdd(item)}
                              className="pressable flex h-9 min-w-[44px] items-center justify-center gap-1 rounded-xl bg-coral-500 px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-coral-600"
                            >
                              <Plus className="h-4 w-4" />
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
