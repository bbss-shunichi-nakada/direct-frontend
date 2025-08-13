// stores/cart.ts
import { defineStore } from 'pinia';

export type CartItem = {
  id: string;
  name: string;
  price: number; // 円（整数）
  quantity: number;
  image?: string;
  maxQty?: number; // サーバーが教える上限（任意）
};

type State = { items: CartItem[] };

export const useCartStore = defineStore('cart', {
  state: (): State => ({ items: [] }),

  getters: {
    totalQuantity: (s) => s.items.reduce((a, i) => a + i.quantity, 0),
    subtotal: (s) => s.items.reduce((a, i) => a + i.price * i.quantity, 0),
  },

  actions: {
    set(items: CartItem[]) {
      this.items = items;
    },
    add(item: CartItem) {
      const found = this.items.find((i) => i.id === item.id);
      if (found) {
        const next = found.quantity + item.quantity;
        found.quantity = Math.max(1, Math.floor(next));
      } else {
        this.items.push({
          ...item,
          quantity: Math.max(1, Math.floor(item.quantity)),
        });
      }
    },
    updateQty(id: string, qty: number) {
      const it = this.items.find((i) => i.id === id);
      if (!it) return;
      const q = Math.max(1, Math.floor(qty));
      const max = it.maxQty ?? Infinity;
      it.quantity = Math.min(q, max);
    },
    remove(id: string) {
      this.items = this.items.filter((i) => i.id !== id);
    },
    clear() {
      this.items = [];
    },
  },
});
