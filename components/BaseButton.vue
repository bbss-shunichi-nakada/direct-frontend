<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center rounded font-semibold transition focus:outline-none',
      iconOnly ? 'p-2' : sizeClasses,
      variantClasses,
      { 'opacity-50 cursor-not-allowed': disabled || loading },
      $attrs.class,
    ]"
    v-bind="$attrs"
  >
    <!-- ローディングスピナー（任意なら既存のまま） -->
    <span
      v-if="loading"
      class="mr-2 inline-block h-4 w-4 animate-spin border-2 border-current border-t-transparent rounded-full"
    />

    <!-- アイコン＋テキストの整列 -->
    <span class="inline-flex items-center gap-1.5">
      <slot name="icon" />
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: 'primary' | 'outline' | 'danger' | 'warning';
  size?: 'base' | 'sm' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
}>();

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary text-white hover:bg-primary-dark';
    case 'outline':
      return 'border border-primary text-primary hover:bg-primary-light hover:text-white';
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700';
    case 'warning':
      return 'bg-amber-500 text-white hover:bg-amber-600';
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
