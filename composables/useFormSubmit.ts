export const useFormSubmit = () => {
  const isSubmitting = ref(false);

  const handleSubmit = async (fn: () => Promise<void>) => {
    if (isSubmitting.value) return;
    isSubmitting.value = true;

    try {
      await fn();
    } catch (err) {
      console.error('エラー発生:', err);
      alert('エラーが発生しました');
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    isSubmitting,
    handleSubmit,
  };
};
