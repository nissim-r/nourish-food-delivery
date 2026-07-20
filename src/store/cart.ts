import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  price: number;
  emoji: string;
  quantity: number;
};

export type OrderStatus = "preparing" | "on_the_way" | "delivered" | "cancelled";

export type Order = {
  id: string;
  items: CartItem[];
  restaurantId: string;
  restaurantName: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  etaMinutes: number;
  address: string;
};

type CartState = {
  items: CartItem[];
  orders: Order[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (opts: {
    deliveryFee: number;
    address: string;
  }) => Order | null;
  getItemCount: () => number;
  getSubtotal: () => number;
  getRestaurantId: () => string | null;
};

const TAX_RATE = 0.0875;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      orders: [],

      addItem: (item, qty = 1) => {
        set((state) => {
          // Only one restaurant at a time
          const existingRestaurant = state.items[0]?.restaurantId;
          if (existingRestaurant && existingRestaurant !== item.restaurantId) {
            // Replace cart with new restaurant items
            return {
              items: [{ ...item, quantity: qty }],
            };
          }

          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + qty }
                  : i,
              ),
            };
          }
          return {
            items: [...state.items, { ...item, quantity: qty }],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      placeOrder: ({ deliveryFee, address }) => {
        const { items } = get();
        if (items.length === 0) return null;

        const subtotal = items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0,
        );
        const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
        const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100;
        const etaMinutes = 25 + Math.floor(Math.random() * 20);

        const order: Order = {
          id: `ord_${Date.now().toString(36)}`,
          items: [...items],
          restaurantId: items[0].restaurantId,
          restaurantName: items[0].restaurantName,
          subtotal,
          deliveryFee,
          tax,
          total,
          status: "preparing",
          createdAt: new Date().toISOString(),
          etaMinutes,
          address,
        };

        set((state) => ({
          items: [],
          orders: [order, ...state.orders],
        }));

        return order;
      },

      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getRestaurantId: () => get().items[0]?.restaurantId ?? null,
    }),
    {
      name: "nourish-cart",
      partialize: (state) => ({
        items: state.items,
        orders: state.orders,
      }),
    },
  ),
);

export const TAX_RATE_EXPORT = TAX_RATE;

export function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}
