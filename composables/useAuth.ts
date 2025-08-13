export const useAuth = () => {
  const config = useRuntimeConfig();

  /**
   * ログイン処理
   * @returns 成功時 true / 失敗時 false
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${config.public.apiBaseUrl}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('ログイン失敗:', data?.message || '不明なエラー');
        return false;
      }

      console.log('ログイン成功:', data);
      return true;
    } catch (err) {
      console.error('通信エラー:', err);
      return false;
    }
  };

  return { login };
};
