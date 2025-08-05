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
import { ref, reactive } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { loginSchema } from '~/schemas/loginSchema';
import type { LoginForm } from '~/schemas/loginSchema';

const showPassword = ref(false);
const togglePassword = () => (showPassword.value = !showPassword.value);

// v-model用フォームデータ
const form = reactive<LoginForm>({
  email: '',
  password: '',
});

// バリデーションエラー保持用
const errors = reactive<Partial<Record<keyof LoginForm, string>>>({});

// 個別項目のバリデーション（onBlur時）
const validateField = (field: keyof LoginForm) => {
  const singleSchema = loginSchema.shape[field];
  const result = singleSchema.safeParse(form[field]);
  if (!result.success) {
    errors[field] = result.error.issues[0].message;
  } else {
    errors[field] = undefined;
  }
};

// 入力時にエラークリア
const clearError = (field: keyof LoginForm) => {
  errors[field] = undefined;
};

const { isSubmitting, handleSubmit } = useFormSubmit();

const userStore = useUserStore();
const { login } = useAuth();

const onSubmit = () =>
  handleSubmit(async () => {
    // Zodでバリデーション
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      // エラーメッセージを設定
      Object.assign(errors, {});
      for (const issue of result.error.issues) {
        errors[issue.path[0] as keyof LoginForm] = issue.message;
      }
      return;
    }

    // 送信中フラグを立てる
    isSubmitting.value = true;

    // バリデーション成功後、ログイン処理
    const success = await login(result.data.email, result.data.password);
    if (success) {
      userStore.login();
      navigateTo('/cart');
    } else {
      alert('ログインに失敗しました');
    }
  });
</script>
