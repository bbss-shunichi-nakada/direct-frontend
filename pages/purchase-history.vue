<template>
  <div class="max-w-5xl mx-auto px-6 py-12">
    <h1 class="text-2xl font-semibold text-gray-900 mb-8">購入履歴</h1>

    <div class="space-y-6">
      <div
        v-for="(item, index) in purchases"
        :key="index"
        class="border border-gray-200 rounded p-4 flex items-center gap-6 bg-white shadow-sm"
      >
        <img :src="item.image" alt="商品画像" class="w-20 h-20 object-cover rounded" />
        <div class="flex-1">
          <h2 class="text-lg font-medium text-gray-800">{{ item.name }}</h2>
          <p class="text-sm text-gray-500">購入日：{{ item.date }}</p>
        </div>
        <div class="text-right text-gray-900 font-semibold whitespace-nowrap">
          ¥{{ item.price.toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const purchases = ref([
  {
    name: 'みやブル 3台 1年版（ダウンロード製品）',
    price: 3080,
    date: '2025年4月15日',
    image: '/images/isw.png',
  },
  {
    name: '商品A',
    price: 2980,
    date: '2025年3月10日',
    image: '/images/isw.png',
  },
]);


</script>
