import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { formatMoney, useCartStore } from "~/store/cart";

export function StickyCartBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = useCartStore((s) => s.items);
  const count = useCartStore((s) => s.getItemCount());
  const subtotal = useCartStore((s) => s.getSubtotal());

  const hide =
    count === 0 ||
    pathname === "/cart" ||
    pathname.startsWith("/order/") ||
    pathname === "/orders";

  if (hide) return null;

  const restaurantName = items[0]?.restaurantName;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[72px] z-30 flex justify-center px-4 pb-safe">
      <Link
        to="/cart"
        className="pointer-events-auto pressable flex w-full max-w-lg items-center gap-3 rounded-2xl bg-charcoal-900 px-4 py-3.5 text-white shadow-float transition hover:bg-charcoal-800"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral-500">
          <ShoppingBag className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {count} {count === 1 ? "item" : "items"}
            {restaurantName ? ` · ${restaurantName}` : ""}
          </p>
          <p className="text-xs text-white/60">View cart & checkout</p>
        </div>
        <span className="text-base font-bold tabular-nums">
          {formatMoney(subtotal)}
        </span>
      </Link>
    </div>
  );
}
