<template>
  <div class="p-6 max-w-md mx-auto">
    <h2 class="text-2xl font-semibold text-center mb-6">パスワード変更</h2>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <BaseInput
        label="現在のパスワード"
        type="password"
        v-model="form.currentPassword"
        :error="errors.currentPassword"
        @input="clearError('currentPassword')"
        @blur="validateField('currentPassword')"
        required
      />

      <BaseInput
        label="新しいパスワード"
        type="password"
        v-model="form.newPassword"
        :error="errors.newPassword"
        @input="clearError('newPassword')"
        @blur="validateField('newPassword')"
        required
      />

      <BaseInput
        label="確認用パスワード"
        type="password"
        v-model="form.confirmPassword"
        :error="errors.confirmPassword"
        @input="clearError('confirmPassword')"
        @blur="validateField('confirmPassword')"
        required
      />

      <BaseButton type="submit" :disabled="isSubmitting" class="w-full">
        {{ isSubmitting ? '変更中...' : 'パスワードを変更する' }}
      </BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useZodForm } from '@/composables/useZodForm';
import { changePasswordSchema } from '@/schemas/changePasswordSchema';
import { useChangePassword } from '@/composables/useChangePassword';

const { form, errors, validate, validateField, clearError } =
  useZodForm(changePasswordSchema);

const { handleSubmit, isSubmitting } = useFormSubmit();

const { changePassword } = useChangePassword();

const onSubmit = () => {
  if (!validate()) return;

  handleSubmit(async () => {
    const success = await changePassword({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    });
    if (success) {
      navigateTo('/profile');
    } else {
      alert('登録に失敗しました');
    }
  });
};
</script>
