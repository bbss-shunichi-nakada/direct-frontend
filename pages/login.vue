<template>
  <div class="max-w-md mx-auto px-4 py-16">
    <div class="bg-white border border-gray-200 shadow-sm rounded p-8">
      <h1 class="text-2xl font-semibold text-gray-900 text-center mb-8">
        ログイン
      </h1>

      <form @submit.prevent="onSubmit">
        <BaseInput
          label="メールアドレス"
          type="email"
          v-model="form.email"
          :error="errors.email"
          @input="clearError('email')"
          @blur="validateField('email')"
        />
        <BaseInput
          label="パスワード"
          :type="showPassword ? 'text' : 'password'"
          v-model="form.password"
          :error="errors.password"
          :append-icon="showPassword ? '非表示' : '表示'"
          @input="clearError('password')"
          @blur="validateField('password')"
          @append-click="togglePassword"
        />

        <BaseButton
          type="submit"
          variant="primary"
          size="base"
          :loading="isSubmitting"
          :disabled="isSubmitting"
          class="w-full rounded-full"
        >
          ログイン
        </BaseButton>
      </form>

      <div class="mt-6 text-sm text-center">
        <NuxtLink to="/password-change" class="text-red-600 hover:underline">
          パスワードを忘れた方はこちら
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { loginSchema } from '~/schemas/loginSchema';
import { useZodForm } from '~/composables/useZodForm';
import { useFormSubmit } from '~/composables/useFormSubmit';
import { useUserStore } from '~/stores/user';
import { useAuth } from '~/composables/useAuth';

const showPassword = ref(false);
const togglePassword = () => (showPassword.value = !showPassword.value);

const { form, errors, validate, validateField, clearError } =
  useZodForm(loginSchema);

const { isSubmitting, handleSubmit } = useFormSubmit();

const userStore = useUserStore();
const { login } = useAuth();

const onSubmit = () => {
  if (!validate()) return;

  handleSubmit(async () => {
    // バリデーション成功後、ログイン処理
    const success = await login(form.email, form.password);
    if (success) {
      userStore.login();
      navigateTo('/cart');
    } else {
      alert('ログインに失敗しました');
    }
  });
};
</script>
