<template>
  <div class="max-w-md mx-auto px-4 py-16">
    <div class="bg-white border border-gray-200 shadow-sm rounded p-8">
      <h1 class="text-2xl font-semibold text-gray-900 text-center mb-8">パスワードの変更</h1>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="current" class="block text-sm font-medium text-gray-700 mb-1">
            現在のパスワード
          </label>
          <input type="password" id="current" v-model="currentPassword" class="input" required />
        </div>

        <div class="mb-4">
          <label for="new" class="block text-sm font-medium text-gray-700 mb-1">
            新しいパスワード
          </label>
          <input type="password" id="new" v-model="newPassword" class="input" required />
        </div>

        <div class="mb-6">
          <label for="confirm" class="block text-sm font-medium text-gray-700 mb-1">
            新しいパスワード（確認）
          </label>
          <input type="password" id="confirm" v-model="confirmPassword" class="input" required />
        </div>

        <BaseButton type="submit" class="w-full bg-gray-900 text-white py-2 rounded-full text-sm">
          保存する
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup>
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const handleSubmit = () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('パスワードが一致しません');
    return;
  }

  navigateTo('/profile');
};
</script>

<style scoped>
.input {
  @apply w-full border border-neutral-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-red-200;
}
</style>
