import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Receipt, ShoppingBag } from "lucide-react";
import { useCartStore } from "~/store/cart";

const tabs = [
  { to: "/" as const, label: "Home", icon: Home },
  { to: "/search" as const, label: "Search", icon: Search },
  { to: "/orders" as const, label: "Orders", icon: Receipt },
  { to: "/cart" as const, label: "Cart", icon: ShoppingBag },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const itemCount = useCartStore((s) => s.getItemCount());

  // Hide on restaurant detail when we want more room — still show
  const isOrderDetail = pathname.startsWith("/order/");

  if (isOrderDetail) return null;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-cream-300/80 bg-cream-50/95 backdrop-blur-lg shadow-nav bottom-nav-safe">
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pt-1.5 pb-1">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active =
            to === "/"
              ? pathname === "/"
              : pathname === to || pathname.startsWith(`${to}/`);
          const isCart = to === "/cart";

          return (
            <Link
              key={to}
              to={to}
              className={`pressable relative flex min-h-[52px] min-w-[64px] flex-col items-center justify-center gap-0.5 rounded-xl px-3 transition-colors ${
                active
                  ? "text-coral-600"
                  : "text-charcoal-700/55 hover:text-charcoal-800"
              }`}
            >
              <span className="relative">
                <Icon
                  className={`h-5 w-5 ${
                    active ? "stroke-[2.25]" : "stroke-[1.75]"
                  }`}
                />
                {isCart && itemCount > 0 && (
                  <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral-500 px-1 text-[10px] font-bold text-white shadow-sm">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </span>
              <span
                className={`text-[11px] ${
                  active ? "font-semibold" : "font-medium"
                }`}
              >
                {label}
              </span>
              {active && (
                <span className="absolute top-0 h-0.5 w-6 rounded-full bg-coral-500" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
