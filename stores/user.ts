// stores/user.ts
import { defineStore } from 'pinia';

type Me = {
  id: number;
  email: string;
  name?: string | null;
  role?: string | null;
};

export const useUserStore = defineStore('user', () => {
  // 既存互換（isLoggedIn）を残す
  const isLoggedIn = ref(false);

  // 追加：商用向けに必要な状態
  const accessToken = ref<string>('');
  const me = ref<Me | null>(null);

  // 既存互換API
  function login() {
    isLoggedIn.value = true;
  }
  function logout() {
    isLoggedIn.value = false;
  }

  // 推奨API（内部で isLoggedIn と同期）
  function setAccessToken(token: string) {
    accessToken.value = token;
    isLoggedIn.value = !!token;
  }
  function setMe(payload: Me | null) {
    me.value = payload;
  }
  function clear() {
    accessToken.value = '';
    me.value = null;
    isLoggedIn.value = false;
  }

  return {
    isLoggedIn,
    accessToken,
    me,
    login,
    logout,
    setAccessToken,
    setMe,
    clear,
  };
});
