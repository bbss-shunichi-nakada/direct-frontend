<!-- components/BaseInput.vue -->
<template>
  <div class="mb-4">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :type="type"
        v-model="modelValue"
        :class="[
          'w-full border rounded px-3 py-2 pr-10 focus:outline-none',
          error ? 'border-red-500' : 'border-neutral-border',
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <button
        v-if="appendIcon"
        type="button"
        class="absolute right-2 top-2 text-gray-500 hover:text-gray-800 text-sm"
        @click="$emit('append-click')"
      >
        {{ appendIcon }}
      </button>
    </div>
    <p v-if="error" class="text-xs text-red-600 mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  type?: string;
  modelValue: string;
  error?: string;
  appendIcon?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'append-click'): void;
}>();
</script>
