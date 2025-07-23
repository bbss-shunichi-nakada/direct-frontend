// stores/user.ts
export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false);

  function login() {
    isLoggedIn.value = true;
  }

  function logout() {
    isLoggedIn.value = false;
  }

  return { isLoggedIn, login, logout };
});
