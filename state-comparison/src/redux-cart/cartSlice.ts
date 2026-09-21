import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartState, Product } from "../types";
const s = createSlice({
  name: "cart",
  initialState: { items: [] } as CartState,
  reducers: {
    add(s, a: PayloadAction<Product>) {
      const x = s.items.find((i) => i.id === a.payload.id);
      if (x) x.quantity++;
      else s.items.push({ ...a.payload, quantity: 1 });
    },
    inc(s, a: PayloadAction<number>) {
      const x = s.items.find((i) => i.id === a.payload);
      if (x) x.quantity++;
    },
    dec(s, a: PayloadAction<number>) {
      const x = s.items.find((i) => i.id === a.payload);
      if (x) x.quantity--;
      s.items = s.items.filter((i) => i.quantity > 0);
    },
    remove(s, a: PayloadAction<number>) {
      s.items = s.items.filter((i) => i.id !== a.payload);
    },
  },
});
export const { add, inc, dec, remove } = s.actions;
export default s.reducer;
