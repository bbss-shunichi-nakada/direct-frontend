<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <!-- 見出し -->
    <h1 class="text-3xl font-bold text-center mb-12">カートに入っている商品</h1>

    <!-- 商品リスト -->
    <div class="space-y-6">
      <div
        v-for="(item, index) in cartItems"
        :key="index"
        class="flex items-center justify-between bg-white shadow-sm rounded p-4 border"
      >
        <!-- 商品情報 -->
        <div class="flex items-center gap-4">
          <img :src="item.image" alt="item.name" class="w-20 h-20 object-contain" />
          <div>
            <div class="text-lg font-medium text-gray-900">{{ item.name }}</div>
            <div class="text-sm text-gray-500">{{ formatPrice(item.price) }}</div>
          </div>
        </div>

        <!-- 数量変更・削除 -->
        <div class="flex items-center gap-4">
          <div class="flex items-center border rounded px-2">
            <button @click="decreaseQty(index)" class="px-2">-</button>
            <span class="px-2">{{ item.quantity }}</span>
            <button @click="increaseQty(index)" class="px-2">+</button>
          </div>
          <button @click="removeItem(index)" class="text-gray-400 hover:text-red-500">🗑</button>
        </div>

        <!-- 小計 -->
        <div class="text-right text-gray-800">
          {{ formatPrice(item.price * item.quantity) }}
        </div>
      </div>
    </div>

    <!-- 合計＆購入導線 -->
    <div class="mt-12 text-right">
      <div class="text-sm text-gray-500 mb-1">
        税込み。
        <span class="underline">配送料</span>
        は購入手続き時に計算されます。
      </div>
      <div class="text-lg font-semibold mb-6">小計 {{ formatPrice(totalAmount) }}</div>
      <BaseButton @click="checkout" class="bg-gray-900 text-white px-6 py-3 rounded-full text-sm">
        レジに進む
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
const cartItems = ref([
  {
    name: 'みやブル 3台 1年版（ダウンロード製品）',
    image: '/images/isw.png',
    price: 3080,
    quantity: 1,
  },
]);

const formatPrice = (price) => `\u00a5${price.toLocaleString()}(税込)`;

const increaseQty = (i) => {
  cartItems.value[i].quantity++;
};
const decreaseQty = (i) => {
  if (cartItems.value[i].quantity > 1) cartItems.value[i].quantity--;
};
const removeItem = (i) => {
  cartItems.value.splice(i, 1);
};

const totalAmount = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const checkout = () => {
  navigateTo('/checkout');
};
</script>
