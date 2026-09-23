import { useCart } from "./CartContext";
import { products } from "../data/products";
import { ProductList } from "../components/ProductList";
import { CartView } from "../components/CartView";
import { RenderBadge } from "../components/RenderBadge";
export function ContextDemo() {
  const { state, dispatch } = useCart();
  return (
    <div className="demo">
      <RenderBadge name="Context demo" />
      <ProductList
        products={products}
        onAdd={(p) => dispatch({ type: "ADD", product: p })}
      />
      <CartView
        title="Context Cart"
        items={state.items}
        onIncrease={(id) => dispatch({ type: "INC", id })}
        onDecrease={(id) => dispatch({ type: "DEC", id })}
        onRemove={(id) => dispatch({ type: "REMOVE", id })}
      />
    </div>
  );
}
