<template>
  <button
    :class="[
      'px-4 py-2 rounded transition font-semibold',
      variant === 'primary'
        ? 'bg-primary text-white hover:bg-primary-dark'
        : variant === 'outline'
        ? 'border border-primary text-primary hover:bg-primary-light'
        : '',
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
});
</script>
