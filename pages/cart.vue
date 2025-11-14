<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-center mb-12">カート</h1>

    <!-- 空状態 -->
    <div
      v-if="!items.length"
      class="border rounded p-10 text-center text-gray-600"
    >
      カートは空です。商品一覧に戻ってお買い物を続けてください。
    </div>

    <div v-else class="grid md:grid-cols-3 gap-8">
      <!-- 左：商品リスト -->
      <div class="md:col-span-2">
        <CartItem
          v-for="i in items"
          :key="i.id"
          :id="i.id"
          :name="i.name"
          :price="i.price"
          :qty="i.quantity"
          :img="i.image"
        />
        <div class="mt-4">
          <BaseButton variant="outline" @click="clear"
            >カートを空にする</BaseButton
          >
        </div>
      </div>

      <!-- 右：サマリー -->
      <aside class="md:sticky md:top-8 border rounded p-6 h-fit">
        <div class="flex justify-between mb-2">
          <span>小計</span><span>{{ jpy(subtotal) }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>送料</span><span>{{ jpy(shipping) }}</span>
        </div>
        <div class="border-t pt-3 font-semibold flex justify-between">
          <span>合計（{{ totalQuantity }}点）</span
          ><span>{{ jpy(total) }}</span>
        </div>

        <BaseButton
          variant="primary"
          class="w-full mt-6"
          :disabled="!items.length || checkingOut || syncing || validating"
          @click="checkout"
        >
          購入手続きへ
        </BaseButton>

        <div class="text-xs text-gray-500 mt-3">
          {{
            checkingOut
              ? '確認中…'
              : syncing
              ? '同期中…'
              : validating
              ? '検証中…'
              : ''
          }}
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartItem from '~/components/CartItem.vue';
import { useCart } from '~/composables/useCart';
import { jpy } from '~/utils/price';

const {
  items,
  subtotal,
  totalQuantity,
  clear,
  syncing,
  validating,
  validateBeforeCheckout,
} = useCart();

const shipping = computed(() =>
  subtotal.value === 0 || subtotal.value > 10000 ? 0 : 550
);
const total = computed(() => subtotal.value + shipping.value);

const checkingOut = ref(false);

const checkout = async () => {
  if (!items.value.length) return;
  checkingOut.value = true;
  const res = await validateBeforeCheckout();
  checkingOut.value = false;

  if (!res.ok && res.changes?.length) {
    // 最低限の通知（お好みでトースト/モーダルへ）
    alert('在庫や価格に変更があります。カートを確認してください。');
    return;
  }

  // 任意：サーバへ注文作成を投げる
  // const payload = { items: items.value.map(i => ({ productId: i.id, qty: i.quantity })) }
  // const created = await $fetch<{ orderId: number }>(`${config.public.apiBaseUrl}/orders/create`, {
  //   method: 'POST',
  //   credentials: 'include',
  //   headers: userStore.accessToken ? { Authorization: `Bearer ${userStore.accessToken}` } : {},
  //   body: payload,
  // })
  
  navigateTo('/checkout'); // 実導線に合わせて変更
};
</script>
