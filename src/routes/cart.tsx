import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Trash2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { getRestaurant } from "~/data/restaurants";
import {
  formatMoney,
  TAX_RATE_EXPORT,
  useCartStore,
} from "~/store/cart";
import { QuantityControl } from "~/components/QuantityControl";
import { EmptyState } from "~/components/EmptyState";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const placeOrder = useCartStore((s) => s.placeOrder);
  const subtotal = useCartStore((s) => s.getSubtotal());

  const restaurant = items[0]
    ? getRestaurant(items[0].restaurantId)
    : undefined;
  const deliveryFee = restaurant?.deliveryFee ?? 0;
  const tax = Math.round(subtotal * TAX_RATE_EXPORT * 100) / 100;
  const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100;

  const handleCheckout = () => {
    const order = placeOrder({
      deliveryFee,
      address: "124 Market Street, Apt 4B",
    });
    if (!order) return;
    toast.success("Order placed!");
    navigate({ to: "/order/$id", params: { id: order.id } });
  };

  if (items.length === 0) {
    return (
      <div className="px-4 pt-6">
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">
          Your cart
        </h1>
        <EmptyState
          emoji="🛒"
          title="Cart is empty"
          description="Browse restaurants and add something delicious. Your next meal is a tap away."
          actionLabel="Find food"
          actionTo="/"
        />
      </div>
    );
  }

  return (
    <div className="animate-fade-up px-4 pb-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">
          Your cart
        </h1>
        <button
          type="button"
          onClick={() => {
            clearCart();
            toast.message("Cart cleared");
          }}
          className="text-xs font-semibold text-coral-600 hover:text-coral-700"
        >
          Clear all
        </button>
      </div>

      {restaurant && (
        <Link
          to="/restaurant/$id"
          params={{ id: restaurant.id }}
          className="mt-4 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream-100 text-2xl">
            {restaurant.emoji}
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-charcoal-900">{restaurant.name}</p>
            <p className="text-xs text-charcoal-700/60">
              {restaurant.deliveryTime} · Add more items
            </p>
          </div>
        </Link>
      )}

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex gap-3 rounded-2xl bg-white p-3.5 shadow-card"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cream-100 text-2xl">
              {item.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-charcoal-900">{item.name}</p>
                <button
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => removeItem(item.id)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-charcoal-700/40 hover:bg-cream-100 hover:text-coral-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm tabular-nums text-charcoal-700/70">
                {formatMoney(item.price)} each
              </p>
              <div className="mt-2 flex items-center justify-between">
                <QuantityControl
                  value={item.quantity}
                  size="sm"
                  onChange={(n) => updateQuantity(item.id, n)}
                />
                <span className="font-semibold tabular-nums text-charcoal-900">
                  {formatMoney(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-start gap-2 rounded-2xl bg-white p-4 shadow-card">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-700/50">
            Deliver to
          </p>
          <p className="mt-0.5 text-sm font-medium text-charcoal-900">
            124 Market Street, Apt 4B
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-card">
        <h2 className="text-sm font-semibold text-charcoal-900">Summary</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between text-charcoal-700/75">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">{formatMoney(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-charcoal-700/75">
            <dt>Delivery</dt>
            <dd className="tabular-nums">
              {deliveryFee === 0 ? (
                <span className="font-medium text-sage-600">Free</span>
              ) : (
                formatMoney(deliveryFee)
              )}
            </dd>
          </div>
          <div className="flex justify-between text-charcoal-700/75">
            <dt>Tax</dt>
            <dd className="tabular-nums">{formatMoney(tax)}</dd>
          </div>
          <div className="flex justify-between border-t border-cream-200 pt-2 text-base font-bold text-charcoal-900">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatMoney(total)}</dd>
          </div>
        </dl>
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        className="pressable mt-5 flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-coral-500 text-base font-semibold text-white shadow-float transition hover:bg-coral-600"
      >
        Place order · {formatMoney(total)}
      </button>
      <p className="mt-3 text-center text-[11px] text-charcoal-700/45">
        Demo checkout — no payment required
      </p>
    </div>
  );
}
