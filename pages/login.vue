<template>
  <div class="max-w-md mx-auto px-4 py-16">
    <div class="bg-white border border-gray-200 shadow-sm rounded p-8">
      <h1 class="text-2xl font-semibold text-gray-900 text-center mb-8">
        ログイン
      </h1>

      <form @submit.prevent="login">
        <!-- メールアドレス -->
        <div class="mb-4">
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            class="w-full border border-neutral-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
          />
        </div>

        <!-- パスワード ＋ 表示切り替え -->
        <div class="mb-6 relative">
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            パスワード
          </label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            required
            class="w-full border border-neutral-border rounded px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-red-200"
          />
          <button
            type="button"
            class="absolute right-2 top-9 text-gray-500 hover:text-gray-800 text-sm"
            @click="togglePassword"
          >
            {{ showPassword ? '非表示' : '表示' }}
          </button>
        </div>

        <!-- ログインボタン -->
        <BaseButton
          type="submit"
          class="w-full bg-gray-900 text-white py-2 rounded-full text-sm"
        >
          ログイン
        </BaseButton>
      </form>

      <div class="mt-6 text-sm text-center">
        <NuxtLink to="/password-change" class="text-red-600 hover:underline">
          パスワードを忘れた方はこちら
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const email = ref('');
const password = ref('');
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const userStore = useUserStore();

const login = async () => {
  try {
    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log('ログイン成功:', data);
      userStore.login(); // ログイン状態に切り替え
      navigateTo('/cart');
    } else {
      console.error('ログイン失敗:', data?.message || '不明なエラー');
      alert('ログインに失敗しました');
    }
  } catch (error) {
    console.error('通信エラー:', error);
    alert('通信に失敗しました');
  }
};
</script>
