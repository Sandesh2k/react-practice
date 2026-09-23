import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { CartState, Product } from "../types";
type A =
  | { type: "ADD"; product: Product }
  | { type: "INC" | "DEC" | "REMOVE"; id: number };
const initial: CartState = { items: [] };
function reducer(s: CartState, a: A): CartState {
  switch (a.type) {
    case "ADD": {
      const x = s.items.find((i) => i.id === a.product.id);
      return x
        ? {
            items: s.items.map((i) =>
              i.id === x.id ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          }
        : { items: [...s.items, { ...a.product, quantity: 1 }] };
    }
    case "INC":
      return {
        items: s.items.map((i) =>
          i.id === a.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      };
    case "DEC":
      return {
        items: s.items
          .map((i) => (i.id === a.id ? { ...i, quantity: i.quantity - 1 } : i))
          .filter((i) => i.quantity > 0),
      };
    case "REMOVE":
      return { items: s.items.filter((i) => i.id !== a.id) };
  }
}
const C = createContext<{ state: CartState; dispatch: Dispatch<A> } | null>(
  null,
);
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
export function useCart() {
  const c = useContext(C);
  if (!c) throw Error("CartProvider missing");
  return c;
}
