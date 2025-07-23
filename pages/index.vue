<template>
  <div class="bg-white text-gray-800">
    <!-- Hero セクション -->
    <section class="bg-gray-100 py-16 px-6 text-center">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl sm:text-5xl font-bold text-primary mb-4">あなたの暮らしに、安心を。</h1>
        <p class="text-lg text-gray-600">
          BBSS
          Onlineは、最先端のセキュリティソリューションをあなたのご家庭やビジネスへお届けします。
        </p>
        <NuxtLink
          to="/signup"
          class="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-full text-sm hover:opacity-90 transition"
        >
          今すぐ始める
        </NuxtLink>
      </div>
    </section>

    <!-- 製品セクション -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <h2 class="text-2xl font-semibold mb-8 text-center">おすすめ製品</h2>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="item in products"
          :key="item.id"
          class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col"
        >
          <img :src="item.image" :alt="item.name" class="rounded mb-4 aspect-[4/3] object-cover" />
          <h3 class="text-lg font-semibold mb-2">{{ item.name }}</h3>
          <p class="text-sm text-gray-600 flex-1">{{ item.description }}</p>
          <div class="mt-4 flex justify-between items-center">
            <span class="text-primary font-bold text-lg">¥{{ item.price.toLocaleString() }}</span>
            <NuxtLink
              to="/cart"
              class="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:opacity-90 transition"
            >
              購入する
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 仮の商品一覧（画像URLなど後で差し替え可能）
const products = [
  {
    id: 1,
    name: 'i-フィルター for マルチデバイス',
    description: '自宅を守るための総合セキュリティシステム。カメラ・センサー・アラーム完備。',
    price: 797,
    image: '/images/product1.png',
  },
  {
    id: 2,
    name: 'ウイルスバスター™ マルチデバイス 月額版',
    description: '家庭用ルーターでも法人レベルのセキュリティ対策を。',
    price: 462,
    image: '/images/product2.png',
  },
  {
    id: 3,
    name: 'ノートン™ セキュリティ オンライン',
    description: 'スマートフォンやタブレットを常に安全に。簡単インストール。',
    price: 627,
    image: '/images/product3.png',
  },
];
</script>
