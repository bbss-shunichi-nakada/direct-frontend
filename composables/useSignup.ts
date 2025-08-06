import type { SignupForm } from '~/schemas/signupSchema';

export const useSignup = () => {
  const config = useRuntimeConfig();

  /**
   * 会員登録処理
   * @returns 成功時 true / 失敗時 false
   */
  const signup = async (form: SignupForm): Promise<boolean> => {
    try {
      const res = await fetch(`${config.public.apiBaseUrl}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      return res.ok;
    } catch (e) {
      console.error('登録通信エラー:', e);
      return false;
    }
  };

  return { signup };
};
