<template>
  <div class="max-w-2xl mx-auto px-6 py-16">
    <div class="bg-white border border-gray-200 shadow-sm rounded p-8">
      <h1 class="text-2xl font-semibold text-gray-900 text-center mb-8">お問い合わせ</h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm text-gray-700 mb-1">お名前</label>
          <input type="text" class="input" v-model="name" required />
        </div>

        <div>
          <label class="block text-sm text-gray-700 mb-1">メールアドレス</label>
          <input type="email" class="input" v-model="email" required />
        </div>

        <div>
          <label class="block text-sm text-gray-700 mb-1">件名</label>
          <input type="text" class="input" v-model="subject" required />
        </div>

        <div>
          <label class="block text-sm text-gray-700 mb-1">お問い合わせ内容</label>
          <textarea class="input h-32" v-model="message" required></textarea>
        </div>

        <div class="flex justify-end pt-4">
          <BaseButton type="submit" class="w-40">送信する</BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');

const handleSubmit = () => {
  alert('お問い合わせを送信しました（仮動作）');
  navigateTo('/');
};
</script>
