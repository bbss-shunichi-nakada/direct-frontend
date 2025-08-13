import { storeToRefs } from 'pinia';
import { useCartStore } from '~/stores/cart';
import { cartSchema } from '~/schemas/cartSchema';

const LS_KEY = 'cart.v1';

type PendingMap = Record<string, boolean>;

export function useCart() {
  const store = useCartStore();
  const { items, subtotal, totalQuantity } = storeToRefs(store);
  const pending: Ref<Record<string, boolean>> = ref({}); // 商品ごとの数量更新ロック
  const syncing = ref(false); // サーバー同期中
  const validating = ref(false); // チェックアウト前検証中

  // --- localStorage 永続化（未ログイン時用） ---
  const loadFromLocal = () => {
    if (!import.meta.client) return;
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const safe = cartSchema.parse(parsed); // Zodで安全に復元
      store.set(safe);
    } catch {}
  };
  const saveToLocal = () => {
    if (!import.meta.client) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items.value));
    } catch {}
  };

  onMounted(loadFromLocal);
  watch(items, saveToLocal, { deep: true });

  // --- API ラッパ（後で Node API に差し替え） ---
  const api = {
    async checkStock(id: string, qty: number) {
      // 例: return await $fetch(`/api/products/${id}/stock`, { params: { qty } })
      // ダミー応答: maxQty=10
      return { ok: true, maxQty: 10 as number | undefined };
    },
    async sync(payload: unknown) {
      // 例: return await $fetch('/api/cart/sync', { method:'POST', body: payload })
      return { ok: true, items: payload };
    },
    async validate(payload: unknown) {
      // 例: 価格変更／在庫切れを検出
      return {
        ok: true,
        changes: [] as Array<{
          id: string;
          reason: 'OUT_OF_STOCK' | 'PRICE_CHANGED';
          newPrice?: number;
          availableQty?: number;
        }>,
      };
    },
  };

  // --- 数量変更（楽観更新 → 在庫確認 → 失敗ロールバック） ---
  const setQuantity = async (id: string | number, qty: number) => {
    const key = String(id);
    if (pending.value[key]) return;

    // ★ busy ロックは再代入で反映させる
    pending.value = { ...pending.value, [key]: true };

    // ★ structuredClone をやめてシャローコピーでバックアップ
    const before = items.value.map((i) => ({ ...i }));

    // 入力を正規化（1以上の整数）
    const nextQty = Math.max(1, Math.floor(qty));
    store.updateQty(key, nextQty);

    try {
      const res = await api.checkStock(key, nextQty);
      if (!res.ok) throw new Error('在庫不足');

      if (res.maxQty != null) {
        const it = items.value.find((i) => i.id === key);
        if (it) {
          it.maxQty = res.maxQty;
          if (it.quantity > res.maxQty) store.updateQty(key, res.maxQty);
        }
      }
      saveToLocal();
      return true;
    } catch (e) {
      // ★ ロールバック
      store.set(before);
      saveToLocal();
      return false;
    } finally {
      // ★ アンロック（再代入で reactive 反映）
      const { [key]: _drop, ...rest } = pending.value;
      pending.value = { ...rest };
    }
  };

  // --- サーバーと同期（ログイン時や明示的同期） ---
  const sync = async () => {
    syncing.value = true;
    try {
      const res = await api.sync({ items: items.value });
      if (!res.ok) throw new Error('sync failed');
      // サーバーから正準の items が返る前提
      // @ts-expect-error ダミー実装のため
      if (res.items) store.set(res.items);
      saveToLocal();
      return true;
    } catch {
      return false;
    } finally {
      syncing.value = false;
    }
  };

  // --- ログイン直後のマージ（匿名カート→ユーザーカート） ---
  const mergeWithServer = async (serverItems: typeof items.value | null) => {
    // serverItems が null の場合はサーバーにカート無し → ローカルをアップロード
    if (!serverItems || serverItems.length === 0) return sync();

    // 同一IDは数量加算、上限は後段の validate/sync で調整
    const merged = [...serverItems];
    for (const it of items.value) {
      const found = merged.find((x) => x.id === it.id);
      if (found) found.quantity += it.quantity;
      else merged.push(it);
    }
    store.set(merged);
    return sync();
  };

  // --- チェックアウト前の最終検証 ---
  const validateBeforeCheckout = async () => {
    validating.value = true;
    try {
      const res = await api.validate({ items: items.value });
      if (!res.ok) return { ok: false, changes: res.changes || [] };
      // 変更なし
      return { ok: true, changes: [] };
    } finally {
      validating.value = false;
    }
  };

  const add = (item: Parameters<typeof store.add>[0]) => store.add(item);
  const remove = (id: string) => store.remove(id);
  const clear = () => store.clear();

  return {
    // state
    items,
    subtotal,
    totalQuantity,
    // flags
    pending,
    syncing,
    validating,
    // actions
    setQuantity,
    add,
    remove,
    clear,
    sync,
    mergeWithServer,
    validateBeforeCheckout,
  };
}
