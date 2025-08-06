export const useChangePassword = () => {
  const config = useRuntimeConfig();

  const changePassword = async (formData: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      const res = await fetch(
        `${config.public.apiBaseUrl}/api/change-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error('パスワード変更失敗:', data?.message || '不明なエラー');
        return false;
      }

      console.log('ログイン成功:', data);
      return true;
    } catch (err) {
      console.error('通信エラー:', err);
      return false;
    }
  };

  return { changePassword };
};
