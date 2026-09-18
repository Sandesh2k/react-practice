import { create } from "zustand";
import type { CartItem, Product } from "../types";
type S = {
  items: CartItem[];
  add: (p: Product) => void;
  inc: (id: number) => void;
  dec: (id: number) => void;
  remove: (id: number) => void;
};
export const useCartStore = create<S>((set) => ({
  items: [],
  add: (p) =>
    set((s) => {
      const x = s.items.find((i) => i.id === p.id);
      return x
        ? {
            items: s.items.map((i) =>
              i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          }
        : { items: [...s.items, { ...p, quantity: 1 }] };
    }),
  inc: (id) =>
    set((s) => ({
      items: s.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    })),
  dec: (id) =>
    set((s) => ({
      items: s.items
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
}));
