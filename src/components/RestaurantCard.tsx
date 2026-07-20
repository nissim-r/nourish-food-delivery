import { Link } from "@tanstack/react-router";
import { Clock, Star, Bike } from "lucide-react";
import type { Restaurant } from "~/data/restaurants";
import { formatMoney } from "~/store/cart";

export function RestaurantCard({
  restaurant,
  compact = false,
}: {
  restaurant: Restaurant;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <Link
        to="/restaurant/$id"
        params={{ id: restaurant.id }}
        className="pressable group flex w-[160px] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-card transition hover:shadow-float"
      >
        <div
          className={`relative flex h-24 items-center justify-center bg-gradient-to-br ${restaurant.gradient}`}
        >
          <span className="text-4xl drop-shadow-md transition group-hover:scale-110">
            {restaurant.emoji}
          </span>
          {restaurant.promo && (
            <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-coral-700 shadow-sm">
              Deal
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1 p-3">
          <h3 className="line-clamp-1 font-display text-sm font-semibold text-charcoal-900">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-charcoal-700/70">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-medium text-charcoal-800">
              {restaurant.rating}
            </span>
            <span>·</span>
            <span>{restaurant.deliveryTime.split("–")[0]} min</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/restaurant/$id"
      params={{ id: restaurant.id }}
      className="pressable group flex overflow-hidden rounded-2xl bg-white shadow-card transition hover:shadow-float"
    >
      <div
        className={`relative flex w-28 shrink-0 items-center justify-center bg-gradient-to-br sm:w-32 ${restaurant.gradient}`}
      >
        <span className="text-5xl drop-shadow-md transition duration-300 group-hover:scale-110">
          {restaurant.emoji}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold leading-tight text-charcoal-900 sm:text-lg">
            {restaurant.name}
          </h3>
          {restaurant.promo && (
            <span className="shrink-0 rounded-full bg-coral-50 px-2 py-0.5 text-[10px] font-semibold text-coral-700">
              Promo
            </span>
          )}
        </div>
        <p className="line-clamp-1 text-xs text-charcoal-700/65 sm:text-sm">
          {restaurant.cuisine.join(" · ")}
        </p>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-charcoal-700/75">
          <span className="inline-flex items-center gap-1 font-medium text-charcoal-800">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {restaurant.rating}
            <span className="font-normal text-charcoal-700/50">
              ({restaurant.reviewCount.toLocaleString()})
            </span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-charcoal-700/45" />
            {restaurant.deliveryTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <Bike className="h-3.5 w-3.5 text-charcoal-700/45" />
            {restaurant.deliveryFee === 0
              ? "Free delivery"
              : formatMoney(restaurant.deliveryFee)}
          </span>
        </div>
      </div>
    </Link>
  );
}
