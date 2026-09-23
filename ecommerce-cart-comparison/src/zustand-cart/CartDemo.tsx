import { products } from "../data/products";
import { ProductList } from "../components/ProductList";
import { CartView } from "../components/CartView";
import { RenderBadge } from "../components/RenderBadge";
import { useCartStore } from "./cartStore";
export function ZustandDemo() {
  const items = useCartStore((s) => s.items),
    add = useCartStore((s) => s.add),
    inc = useCartStore((s) => s.inc),
    dec = useCartStore((s) => s.dec),
    remove = useCartStore((s) => s.remove);
  return (
    <div className="demo">
      <RenderBadge name="Zustand demo" />
      <ProductList products={products} onAdd={add} />
      <CartView
        title="Zustand Cart"
        items={items}
        onIncrease={inc}
        onDecrease={dec}
        onRemove={remove}
      />
    </div>
  );
}
