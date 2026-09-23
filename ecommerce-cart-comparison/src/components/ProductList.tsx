import type { Product } from "../types";
export function ProductList({
  products,
  onAdd,
}: {
  products: Product[];
  onAdd: (p: Product) => void;
}) {
  return (
    <section>
      <h2>Products</h2>
      <div className="products">
        {products.map((p) => (
          <article className="product" key={p.id}>
            <span className="emoji">{p.emoji}</span>
            <h3>{p.name}</h3>
            <b>₹{p.price.toLocaleString("en-IN")}</b>
            <button onClick={() => onAdd(p)}>Add to cart</button>
          </article>
        ))}
      </div>
    </section>
  );
}
