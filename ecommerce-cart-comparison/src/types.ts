export type Product = {
  id: number;
  name: string;
  price: number;
  emoji: string;
};
export type CartItem = Product & { quantity: number };
export type CartState = { items: CartItem[] };
