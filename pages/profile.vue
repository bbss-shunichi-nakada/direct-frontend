<template>
  <div class="max-w-2xl mx-auto px-6 py-16">
    <div class="bg-white border border-gray-200 shadow-sm rounded p-8">
      <h1 class="text-2xl font-semibold text-gray-900 text-center mb-8">
        会員情報
      </h1>

      <div class="space-y-6 text-sm text-gray-800">
        <div>
          <div class="text-gray-500 mb-1">氏名</div>
          <div class="font-medium">{{ profile.name }}</div>
        </div>

        <div>
          <div class="text-gray-500 mb-1">メールアドレス</div>
          <div class="font-medium">{{ profile.email }}</div>
        </div>

        <div>
          <div class="text-gray-500 mb-1">電話番号</div>
          <div class="font-medium">{{ profile.phone }}</div>
        </div>

        <div>
          <div class="text-gray-500 mb-1">住所</div>
          <div class="font-medium">{{ profile.address }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#app';
import { useUserStore } from '~/stores/user';

const config = useRuntimeConfig();
const userStore = useUserStore();

// 既存の初期表示は残す（ローディング時のプレースホルダとして）
const profile = reactive({
  name: '山田 太郎',
  email: 'taro@example.com',
  phone: '090-1234-5678',
  address: '東京都千代田区サンプル1-2-3',
});

// マウント時に実データで上書き（name/phone/addressは任意項目なら存在チェック）
onMounted(async () => {
  try {
    // store に me があればそれを使い、無ければAPIから取得
    let me = userStore.me;
    if (!me && userStore.accessToken) {
      me = (await $fetch(`${config.public.apiBaseUrl}/api/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: { Authorization: `Bearer ${userStore.accessToken}` },
      })) as any;
      userStore.setMe(me as any);
    }
    if (me) {
      profile.name = (me as any).name ?? profile.name;
      profile.email = (me as any).email ?? profile.email;
      // phone / address はバックエンドにあれば適宜
    }
  } catch (e) {
    console.warn('プロフィール取得に失敗しました', e);
  }
});
</script>
