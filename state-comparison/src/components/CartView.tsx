import type { CartItem } from "../types";
export function CartView({
  items,
  onIncrease,
  onDecrease,
  onRemove,
  title,
}: {
  items: CartItem[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  title: string;
}) {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  return (
    <section className="cart">
      <header>
        <div>
          <h2>{title}</h2>
          <small>
            {count} item{count === 1 ? "" : "s"}
          </small>
        </div>
        <strong>₹{total.toLocaleString("en-IN")}</strong>
      </header>
      {items.length === 0 ? (
        <p className="empty">Cart is empty.</p>
      ) : (
        items.map((i) => (
          <div className="row" key={i.id}>
            <span>{i.emoji}</span>
            <div>
              <b>{i.name}</b>
              <small>₹{i.price.toLocaleString("en-IN")} each</small>
            </div>
            <div className="qty">
              <button onClick={() => onDecrease(i.id)}>-</button>
              <b>{i.quantity}</b>
              <button onClick={() => onIncrease(i.id)}>+</button>
            </div>
            <b>₹{(i.price * i.quantity).toLocaleString("en-IN")}</b>
            <button className="remove" onClick={() => onRemove(i.id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </section>
  );
}
