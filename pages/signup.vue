<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-center mb-6">サインアップ</h2>

    <form @submit.prevent="onSubmit" class="space-y-4 max-w-md mx-auto">
      <!-- 必須 -->
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
        type="password"
        v-model="form.password"
        :error="errors.password"
        @input="clearError('password')"
        @blur="validateField('password')"
      />

      <!-- 任意 -->
      <BaseInput
        label="氏名"
        v-model="form.name"
        :error="errors.name"
        @input="clearError('name')"
        @blur="validateField('name')"
      />
      <BaseInput
        label="氏名（カナ）"
        v-model="form.kana"
        :error="errors.kana"
        @input="clearError('kana')"
        @blur="validateField('kana')"
      />
      <BaseInput
        label="郵便番号"
        v-model="form.postalCode"
        :error="errors.postalCode"
        @input="clearError('postalCode')"
        @blur="validateField('postalCode')"
      />
      <BaseInput
        label="都道府県"
        v-model="form.prefecture"
        :error="errors.prefecture"
        @input="clearError('prefecture')"
        @blur="validateField('prefecture')"
      />
      <BaseInput
        label="市区町村・番地"
        v-model="form.address1"
        :error="errors.address1"
        @input="clearError('address1')"
        @blur="validateField('address1')"
      />
      <BaseInput
        label="建物名・部屋番号"
        v-model="form.address2"
        :error="errors.address2"
        @input="clearError('address2')"
        @blur="validateField('address2')"
      />
      <BaseInput
        label="電話番号"
        v-model="form.phone"
        :error="errors.phone"
        @input="clearError('phone')"
        @blur="validateField('phone')"
      />

      <div class="flex items-center space-x-2">
        <input id="newsletter" type="checkbox" v-model="form.newsletter" />
        <label for="newsletter" class="text-sm">メルマガを受け取る</label>
      </div>

      <BaseButton
        type="submit"
        variant="primary"
        size="base"
        :loading="isSubmitting"
        :disabled="isSubmitting"
        class="w-full rounded-full"
      >
        登録
      </BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#app';
import { useZodForm } from '~/composables/useZodForm';
import { signupSchema } from '~/schemas/signupSchema';
import { useFormSubmit } from '~/composables/useFormSubmit';

// 既存：form/errors/validate などはそのまま
const { form, errors, validate, validateField, clearError } =
  useZodForm(signupSchema);
const config = useRuntimeConfig();
const { isSubmitting, handleSubmit } = useFormSubmit();

// 既存の onSubmit をこの実装に入れ替え（templateは触らない）
const onSubmit = () => {
  if (!validate()) return;

  handleSubmit(async () => {
    // 既存の form オブジェクトをそのままPOST
    await $fetch(`${config.public.apiBaseUrl}/api/users/signup`, {
      method: 'POST',
      credentials: 'include',
      body: form, // バックエンドの受け口に合わせて必要ならフィールド絞る
    });
    navigateTo('/login'); // 既存の動線へ
  });
};
</script>
