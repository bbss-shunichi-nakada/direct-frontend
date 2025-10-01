export const useAuth = () => {
  const { $api } = useNuxtApp();

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await $api('/users/login', {
        method: 'POST',
        body: { email, password }, // Content-Type/JSON は ofetch が付与
      });
      // 必要に応じて user store 更新
      return true;
    } catch (err: any) {
      console.error('ログイン失敗:', err?.data || err?.message || err);
      return false;
    }
  };

  return { login };
};
