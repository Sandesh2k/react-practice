import { useState } from "react";
import { CartProvider } from "./context-cart/CartContext";
import { ContextDemo } from "./context-cart/CartDemo";
import { ReduxDemo } from "./redux-cart/CartDemo";
import { ZustandDemo } from "./zustand-cart/CartDemo";
type Tab = "context" | "redux" | "zustand";
export default function App() {
  const [t, setT] = useState<Tab>("context");
  return (
    <main>
      <nav>
        {(["context", "redux", "zustand"] as Tab[]).map((x) => (
          <button
            className={t === x ? "active" : ""}
            onClick={() => setT(x)}
            key={x}
          >
            {x === "context"
              ? "Context + Reducer"
              : x === "redux"
                ? "Redux Toolkit"
                : "Zustand"}
          </button>
        ))}
      </nav>
      {t === "context" ? (
        <CartProvider>
          <ContextDemo />
        </CartProvider>
      ) : t === "redux" ? (
        <ReduxDemo />
      ) : (
        <ZustandDemo />
      )}
    </main>
  );
}
