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
        />
        <BaseInput
          label="パスワード"
          :type="showPassword ? 'text' : 'password'"
          v-model="form.password"
          :error="errors.password"
          :append-icon="showPassword ? '非表示' : '表示'"
          @append-click="togglePassword"
        />

        <BaseButton
          type="submit"
          class="w-full bg-gray-900 text-white py-2 rounded-full text-sm"
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
import { loginSchema, LoginForm } from '~/schemas/loginSchema';

const showPassword = ref(false);
const togglePassword = () => (showPassword.value = !showPassword.value);

// v-model用フォームデータ
const form = reactive<LoginForm>({
  email: '',
  password: '',
});

// バリデーションエラー保持用
const errors = reactive<Partial<Record<keyof LoginForm, string>>>({});

const userStore = useUserStore();
const { login } = useAuth();

const onSubmit = async () => {
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

  // API呼び出し
  const success = await login(result.data.email, result.data.password);
  if (success) {
    userStore.login();
    navigateTo('/cart');
  } else {
    alert('ログインに失敗しました');
  }
};
</script>
