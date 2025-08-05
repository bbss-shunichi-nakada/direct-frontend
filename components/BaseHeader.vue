<template>
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
      <!-- ロゴ -->
      <NuxtLink
        to="/"
        class="text-2xl sm:text-3xl font-bold text-primary hover:opacity-80 tracking-wide"
      >
        BBSS Online
      </NuxtLink>

      <!-- ナビゲーション -->
      <nav class="flex items-center gap-6 text-sm text-gray-700">
        <!-- ログイン状態に応じて表示 -->
        <template v-if="isLoggedIn">
          <!-- カート -->
          <NuxtLink to="/cart" class="hover:text-primary">カート</NuxtLink>
          <!-- アカウントメニュー -->
          <div class="relative" @click="toggleMenu">
            <button class="flex items-center gap-1 hover:text-primary">
              アカウント
              <span class="text-xs">▼</span>
            </button>
            <div
              v-if="showMenu"
              class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-10"
            >
              <NuxtLink to="/profile" class="block px-4 py-2 hover:bg-gray-50">会員情報</NuxtLink>
              <NuxtLink to="/password-change" class="block px-4 py-2 hover:bg-gray-50">
                パスワード変更
              </NuxtLink>
              <NuxtLink to="/purchase-history" class="block px-4 py-2 hover:bg-gray-50">
                購入履歴
              </NuxtLink>
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
              >
                ログアウト
              </button>
            </div>
          </div>
        </template>

        <!-- 未ログイン時 -->
        <template v-else>
          <NuxtLink to="/login" class="hover:text-primary">サインイン</NuxtLink>
          <NuxtLink to="/signup" class="hover:text-primary">サインアップ</NuxtLink>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const logout = () => {
  userStore.logout(); // ログアウト状態に切り替え
  navigateTo('/');
};
</script>
