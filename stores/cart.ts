// stores/cart.ts
import { defineStore } from 'pinia';

export type CartItem = {
  id: string; // ← 既存に合わせて string
  name: string;
  price: number; // 円（整数）
  quantity: number;
  image?: string;
  maxQty?: number; // サーバが教える上限（任意）
};

type State = { items: CartItem[] };

export const useCartStore = defineStore('cart', {
  state: (): State => ({
    items: [],
  }),
  getters: {
    // 合計点数
    count: (s) => s.items.reduce((sum, i) => sum + (i.quantity ?? 0), 0),
    // 小計（円）
    subtotal: (s) =>
      s.items.reduce((sum, i) => sum + i.price * (i.quantity ?? 0), 0),
    // バックエンドの /api/orders に合わせた1件用の射影（使いどころに応じて）
    asOrderUnits: (s) =>
      s.items
        .map((i) => ({ productId: Number(i.id), quantity: Number(i.quantity) }))
        .filter(
          (u) => Number.isFinite(u.productId) && Number.isFinite(u.quantity)
        ),
  },
  actions: {
    // 追加（既存と衝突しないよう安全に）
    add(item: CartItem) {
      const idx = this.items.findIndex((x) => x.id === item.id);
      if (idx >= 0) {
        this.items[idx].quantity += item.quantity;
      } else {
        this.items.push({ ...item });
      }
    },
    setQuantity(productId: string, q: number) {
      const t = this.items.find((x) => x.id === productId);
      if (t) t.quantity = Math.max(1, q | 0);
    },
    remove(productId: string) {
      this.items = this.items.filter((x) => x.id !== productId);
    },
    clear() {
      this.items = [];
    },
  },
});
