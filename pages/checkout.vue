<template>
  <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- 左：購入者入力フォーム -->
    <div class="lg:col-span-2 space-y-8">
      <h1 class="text-2xl font-semibold text-gray-900">購入手続き</h1>

      <h2 class="text-2xl font-semibold text-gray-900">会員登録</h2>
      <!-- メール・パスワード -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
        <input type="email" class="input" v-model="email" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
        <input type="password" class="input" v-model="password" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">パスワード（再確認）</label>
        <input type="password" class="input" v-model="password" required />
      </div>

      <!-- メルマガ -->
      <div class="flex items-center">
        <input type="checkbox" id="newsletter" v-model="newsletter" class="mr-2" />
        <label for="newsletter" class="text-sm text-gray-700">お得な情報をメールで受け取る</label>
      </div>

      <h2 class="text-2xl font-semibold text-gray-900">お届け先</h2>
      <!-- 氏名・カナ -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">氏名</label>
          <input type="text" class="input" v-model="name" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">フリガナ</label>
          <input type="text" class="input" v-model="kana" />
        </div>
      </div>

      <!-- 住所 -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">郵便番号</label>
          <input type="text" class="input" v-model="postalCode" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">都道府県</label>
          <input type="text" class="input" v-model="prefecture" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">市区町村・番地</label>
          <input type="text" class="input" v-model="address" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            建物名・部屋番号（任意）
          </label>
          <input type="text" class="input" v-model="building" />
        </div>
      </div>

      <!-- 電話番号 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
        <input type="tel" class="input" v-model="phone" />
      </div>

      <h2 class="text-2xl font-semibold text-gray-900">お支払い</h2>
      <!-- クレジットカード -->
      <div class="space-y-4">
        <input type="text" placeholder="カード番号" class="input" v-model="cardNumber" />
        <div class="grid grid-cols-2 gap-4">
          <input type="text" placeholder="有効期限 (MM/YY)" class="input" v-model="cardExpiry" />
          <input type="text" placeholder="セキュリティコード" class="input" v-model="cardCvc" />
        </div>
        <BaseButton
          @click="handleCheckout"
          class="w-full bg-gray-900 text-white py-2 rounded-full text-sm"
        >
          今すぐ支払う
        </BaseButton>
      </div>
    </div>

    <!-- 右カラム：追従カート -->
    <div class="relative">
      <div class="sticky top-20 bg-gray-50 border border-gray-200 rounded p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">注文内容</h2>
        <div
          v-for="item in cartItems"
          :key="item.name"
          class="flex justify-between items-center mb-4"
        >
          <div class="flex items-center space-x-4">
            <img :src="item.image" alt="item.name" class="w-12 h-12 object-cover rounded" />
            <div class="text-sm text-gray-800">{{ item.name }}</div>
          </div>
          <div class="text-sm text-gray-900 font-medium whitespace-nowrap">
            ¥{{ item.price.toLocaleString() }}
          </div>
        </div>
        <div class="mt-4 border-t pt-4 text-right">
          <div class="text-sm text-gray-500 mb-1">税込</div>
          <div class="text-lg font-bold text-gray-900">合計 ¥{{ totalPrice.toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const email = ref('');
const password = ref('');
const name = ref('');
const kana = ref('');
const postalCode = ref('');
const prefecture = ref('');
const address = ref('');
const building = ref('');
const phone = ref('');
const newsletter = ref(true);

const cardNumber = ref('');
const cardExpiry = ref('');
const cardCvc = ref('');

const cartItems = ref([
  { name: 'みやブル 3台 1年版（ダウンロード製品）', price: 3080, image: '/images/isw.png' },
  { name: '追加商品A', price: 3080, image: '/images/isw.png' },
]);

const totalPrice = computed(() => cartItems.value.reduce((sum, item) => sum + item.price, 0));

const handleCheckout = () => {
  navigateTo('/thanks');
};
</script>
