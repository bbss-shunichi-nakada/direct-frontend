<template>
  <div class="max-w-3xl mx-auto px-6 py-16">
    <h1 class="text-2xl font-semibold text-gray-900 text-center mb-8">よくあるご質問</h1>

    <div v-for="(faq, index) in faqs" :key="index" class="mb-6">
      <button
        @click="toggle(index)"
        class="w-full text-left text-lg font-medium text-gray-800 flex justify-between items-center"
      >
        {{ faq.question }}
        <span class="text-gray-500 text-xl">{{ openIndex === index ? '−' : '+' }}</span>
      </button>
      <div
        v-if="openIndex === index"
        class="bg-gray-50 border border-gray-200 p-4 mt-2 rounded text-sm text-gray-700"
      >
        {{ faq.answer }}
      </div>
    </div>
  </div>
</template>

<script setup>
const openIndex = ref(null);
const toggle = (i) => {
  openIndex.value = openIndex.value === i ? null : i;
};

const faqs = ref([
  { question: '送料はいくらですか？', answer: '通常全国一律500円（税込）です。' },
  {
    question: '返品は可能ですか？',
    answer: '商品到着後7日以内であれば可能です。詳細は返品ポリシーをご確認ください。',
  },
  {
    question: '支払い方法は？',
    answer: 'クレジットカード、コンビニ払い、銀行振込に対応しています。',
  },
]);
</script>
