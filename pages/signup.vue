<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-center mb-6">サインアップ画面</h2>

    <form @submit.prevent="onSubmit" class="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        v-model="name"
        placeholder="ユーザー名"
        class="w-full border px-3 py-2 rounded bg-gray-50"
      />
      <input
        type="email"
        v-model="email"
        placeholder="メールアドレス"
        class="w-full border px-3 py-2 rounded bg-gray-50"
      />
      <input
        type="password"
        v-model="password"
        placeholder="パスワード"
        class="w-full border px-3 py-2 rounded bg-gray-50"
      />
      <BaseButton class="bg-indigo-600 text-white px-6 py-2 rounded w-full"
        >登録する</BaseButton
      >
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');

const userStore = useUserStore();

const onSubmit = async () => {
  try {
    const res = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log('アカウント作成成功:', data);
      userStore.login(); // ログイン状態に切り替え
      navigateTo('/profile');
    } else {
      console.error('アカウント作成失敗:', data?.message || '不明なエラー');
      alert('アカウント作成に失敗しました');
    }
  } catch (error) {
    console.error('通信エラー:', error);
    alert('通信に失敗しました');
  }
};
</script>
