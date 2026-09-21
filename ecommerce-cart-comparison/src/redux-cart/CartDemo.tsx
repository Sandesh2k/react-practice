import { Provider, useDispatch, useSelector } from "react-redux";
import { products } from "../data/products";
import { ProductList } from "../components/ProductList";
import { CartView } from "../components/CartView";
import { RenderBadge } from "../components/RenderBadge";
import { store, type RootState, type AppDispatch } from "./store";
import { add, inc, dec, remove } from "./cartSlice";
function Inner() {
  const items = useSelector((s: RootState) => s.cart.items);
  const d = useDispatch<AppDispatch>();
  return (
    <div className="demo">
      <RenderBadge name="Redux demo" />
      <ProductList products={products} onAdd={(p) => d(add(p))} />
      <CartView
        title="Redux Toolkit Cart"
        items={items}
        onIncrease={(id) => d(inc(id))}
        onDecrease={(id) => d(dec(id))}
        onRemove={(id) => d(remove(id))}
      />
    </div>
  );
}
export function ReduxDemo() {
  return (
    <Provider store={store}>
      <Inner />
    </Provider>
  );
}
