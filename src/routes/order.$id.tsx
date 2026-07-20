import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  ArrowLeft,
  Check,
  ChefHat,
  Bike,
  Home,
  MapPin,
} from "lucide-react";
import { formatMoney, useCartStore, type Order } from "~/store/cart";
import { getRestaurant } from "~/data/restaurants";

export const Route = createFileRoute("/order/$id")({
  component: OrderDetailPage,
});

function OrderDetailPage() {
  const { id } = Route.useParams();
  const orders = useCartStore((s) => s.orders);
  const order = orders.find((o) => o.id === id);

  const liveStatus = useMemo(() => {
    if (!order) return null;
    if (order.status === "delivered" || order.status === "cancelled") {
      return order.status;
    }
    const ageMin =
      (Date.now() - new Date(order.createdAt).getTime()) / 60000;
    if (ageMin > order.etaMinutes) return "delivered" as const;
    if (ageMin > 8) return "on_the_way" as const;
    return "preparing" as const;
  }, [order]);

  if (!order || !liveStatus) {
    return (
      <div className="flex flex-col items-center px-6 py-20 text-center">
        <p className="text-5xl">📦</p>
        <h1 className="mt-4 font-display text-xl font-semibold">
          Order not found
        </h1>
        <Link
          to="/orders"
          className="mt-6 rounded-2xl bg-coral-500 px-6 py-3 text-sm font-semibold text-white"
        >
          View orders
        </Link>
      </div>
    );
  }

  const restaurant = getRestaurant(order.restaurantId);
  const steps = [
    { key: "preparing", label: "Preparing", icon: ChefHat },
    { key: "on_the_way", label: "On the way", icon: Bike },
    { key: "delivered", label: "Delivered", icon: Home },
  ] as const;

  const stepIndex =
    liveStatus === "preparing"
      ? 0
      : liveStatus === "on_the_way"
        ? 1
        : liveStatus === "delivered"
          ? 2
          : 0;

  const etaText =
    liveStatus === "delivered"
      ? "Enjoy your meal!"
      : liveStatus === "on_the_way"
        ? `Arriving in ~${Math.max(5, order.etaMinutes - 8)} min`
        : `Ready in ~${order.etaMinutes} min`;

  return (
    <div className="animate-fade-up">
      <header className="flex items-center gap-3 px-4 pb-2 pt-4">
        <Link
          to="/orders"
          aria-label="Back to orders"
          className="pressable flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-card"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-coral-600">
            Order {order.id.slice(-6).toUpperCase()}
          </p>
          <h1 className="font-display text-xl font-semibold text-charcoal-900">
            {liveStatus === "delivered" ? "Order complete" : "Tracking"}
          </h1>
        </div>
      </header>

      <main className="px-4 pb-10 pt-2">
        {/* Status card */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-coral-500 via-coral-600 to-coral-800 p-5 text-white shadow-float">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{restaurant?.emoji ?? "🍽️"}</span>
            <div>
              <p className="font-display text-lg font-semibold">
                {order.restaurantName}
              </p>
              <p className="text-sm text-white/80">{etaText}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            {steps.map((step, i) => {
              const done = i <= stepIndex;
              const current = i === stepIndex;
              const Icon = step.icon;
              return (
                <div key={step.key} className="flex flex-1 flex-col items-center">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl transition ${
                      done
                        ? "bg-white text-coral-600"
                        : "bg-white/15 text-white/50"
                    } ${current ? "ring-2 ring-white/40 animate-pulse-soft" : ""}`}
                  >
                    {done && i < stepIndex ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <p
                    className={`mt-2 text-[11px] font-medium ${
                      done ? "text-white" : "text-white/50"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
          {/* progress line under icons */}
          <div className="relative mx-8 -mt-[52px] mb-10 h-0.5 bg-white/20">
            <div
              className="absolute inset-y-0 left-0 bg-white transition-all duration-700"
              style={{
                width:
                  stepIndex === 0
                    ? "0%"
                    : stepIndex === 1
                      ? "50%"
                      : "100%",
              }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-white p-4 shadow-card">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-700/50">
              Delivering to
            </p>
            <p className="mt-0.5 text-sm font-medium text-charcoal-900">
              {order.address}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-card">
          <h2 className="text-sm font-semibold text-charcoal-900">Items</h2>
          <ul className="mt-3 space-y-3">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <span className="text-2xl">{item.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-charcoal-900">
                    {item.quantity}× {item.name}
                  </p>
                </div>
                <span className="text-sm tabular-nums text-charcoal-700/70">
                  {formatMoney(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1.5 border-t border-cream-200 pt-3 text-sm">
            <div className="flex justify-between text-charcoal-700/70">
              <dt>Subtotal</dt>
              <dd className="tabular-nums">{formatMoney(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-charcoal-700/70">
              <dt>Delivery</dt>
              <dd className="tabular-nums">
                {order.deliveryFee === 0
                  ? "Free"
                  : formatMoney(order.deliveryFee)}
              </dd>
            </div>
            <div className="flex justify-between text-charcoal-700/70">
              <dt>Tax</dt>
              <dd className="tabular-nums">{formatMoney(order.tax)}</dd>
            </div>
            <div className="flex justify-between pt-1 text-base font-bold text-charcoal-900">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatMoney(order.total)}</dd>
            </div>
          </dl>
        </div>

        <Link
          to="/"
          className="pressable mt-6 flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-charcoal-900 text-sm font-semibold text-white shadow-card transition hover:bg-charcoal-800"
        >
          Order something else
        </Link>
      </main>
    </div>
  );
}
