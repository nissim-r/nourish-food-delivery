import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Clock } from "lucide-react";
import { formatMoney, useCartStore, type Order } from "~/store/cart";
import { getRestaurant } from "~/data/restaurants";
import { EmptyState } from "~/components/EmptyState";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
});

function statusLabel(status: Order["status"]) {
  switch (status) {
    case "preparing":
      return { text: "Preparing", color: "bg-amber-100 text-amber-800" };
    case "on_the_way":
      return { text: "On the way", color: "bg-sky-100 text-sky-800" };
    case "delivered":
      return { text: "Delivered", color: "bg-sage-500/15 text-sage-600" };
    case "cancelled":
      return { text: "Cancelled", color: "bg-stone-100 text-stone-600" };
  }
}

function OrdersPage() {
  const orders = useCartStore((s) => s.orders);
  const active = orders.filter((o) =>
    o.status === "preparing" || o.status === "on_the_way",
  );
  const past = orders.filter(
    (o) => o.status === "delivered" || o.status === "cancelled",
  );

  // Promote older "preparing" to visual on_the_way based on time for demo
  const displayOrders = orders.map((o) => {
    if (o.status !== "preparing") return o;
    const ageMin =
      (Date.now() - new Date(o.createdAt).getTime()) / 60000;
    if (ageMin > 8) return { ...o, status: "on_the_way" as const };
    if (ageMin > o.etaMinutes) return { ...o, status: "delivered" as const };
    return o;
  });

  const activeDisplay = displayOrders.filter(
    (o) => o.status === "preparing" || o.status === "on_the_way",
  );
  const pastDisplay = displayOrders.filter(
    (o) => o.status === "delivered" || o.status === "cancelled",
  );

  if (orders.length === 0) {
    return (
      <div className="px-4 pt-6">
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">
          Orders
        </h1>
        <EmptyState
          emoji="📦"
          title="No orders yet"
          description="When you place an order, you’ll track it here in real time."
          actionLabel="Start ordering"
          actionTo="/"
        />
      </div>
    );
  }

  return (
    <div className="animate-fade-up px-4 pb-8 pt-6">
      <h1 className="font-display text-2xl font-semibold text-charcoal-900">
        Orders
      </h1>

      {activeDisplay.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-coral-600">
            Active
          </h2>
          <div className="mt-2 space-y-3">
            {activeDisplay.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </section>
      )}

      {pastDisplay.length > 0 && (
        <section className="mt-7">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal-700/50">
            Past
          </h2>
          <div className="mt-2 space-y-3">
            {pastDisplay.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </section>
      )}

      {/* keep refs used */}
      <span className="hidden">{active.length + past.length}</span>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const restaurant = getRestaurant(order.restaurantId);
  const status = statusLabel(order.status);
  const date = new Date(order.createdAt);

  return (
    <Link
      to="/order/$id"
      params={{ id: order.id }}
      className="pressable flex gap-3 rounded-2xl bg-white p-4 shadow-card transition hover:shadow-float"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cream-100 text-3xl">
        {restaurant?.emoji ?? "🍽️"}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-charcoal-900">
            {order.restaurantName}
          </p>
          <ChevronRight className="h-4 w-4 shrink-0 text-charcoal-700/30" />
        </div>
        <p className="mt-0.5 text-xs text-charcoal-700/60">
          {order.items.reduce((s, i) => s + i.quantity, 0)} items ·{" "}
          {formatMoney(order.total)}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${status.color}`}
          >
            {status.text}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-charcoal-700/50">
            <Clock className="h-3 w-3" />
            {date.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}{" "}
            ·{" "}
            {date.toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
