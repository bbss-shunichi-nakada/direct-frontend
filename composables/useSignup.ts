import type { SignupForm } from '~/schemas/signupSchema';

export const useSignup = () => {
  const { $api } = useNuxtApp();

  const signup = async (form: SignupForm): Promise<boolean> => {
    try {
      await $api('/users/signup', {
        method: 'POST',
        body: form,
      });
      return true;
    } catch (err: any) {
      console.error('サインアップ失敗:', err?.data || err?.message || err);
      return false;
    }
  };

  return { signup };
};
