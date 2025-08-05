<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center rounded font-semibold transition focus:outline-none',
      sizeClasses,
      variantClasses,
      { 'opacity-50 cursor-not-allowed': disabled || loading },
      $attrs.class,
    ]"
    v-bind="$attrs"
  >
    <span
      v-if="loading"
      class="mr-2 animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"
    ></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: 'primary' | 'outline' | 'danger';
  size?: 'base' | 'sm' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
}>();

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary text-white hover:bg-primary-dark';
    case 'outline':
      return 'border border-primary text-primary hover:bg-primary-light';
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700';
    default:
      return '';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm px-3 py-1.5';
    case 'lg':
      return 'text-lg px-5 py-3';
    default:
      return 'text-base px-4 py-2';
  }
});
</script>
