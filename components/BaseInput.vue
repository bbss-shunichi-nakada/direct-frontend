<template>
  <!-- ★ wrapperClass で外側の余白などを制御（デフォルト mb-4） -->
  <div :class="wrapperClass">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :type="type"
        :value="modelValue"
        :class="[
          // ベース
          'w-full border rounded focus:outline-none',
          // サイズ（BaseButtonと合わせる）
          sizeClasses,
          // エラー枠
          error ? 'border-red-500' : 'border-neutral-border',
          // 右側に付くアイコン余白（append-icon未使用時は無視OK）
          appendIcon ? 'pr-10' : '',
          // ★ 親から渡された class を内側<input>に適用して上書き可能に
          inputClass,
        ]"
        v-bind="attrsNoClass"
        @input="onInput"
        @blur="$emit('blur')"
      />
      <button
        v-if="appendIcon"
        type="button"
        class="absolute right-2 top-2 text-gray-500 hover:text-gray-800 text-sm"
        @click="$emit('append-click')"
      >
        <i :class="appendIcon"></i>
      </button>
    </div>
    <p v-if="error" class="mt-1 text-xs text-red-600">{{ error }}</p>
  </div>
</template>

<style scoped>
/* Chrome, Safari, Edge 対応 */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox 対応 */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';

/**
 * ルート要素に class を集約し、input は props.inputClass で制御できるようにする。
 * （コンポーネントに付与した class は wrapper に適用する設計が自然だが、
 *  明示的に wrapperClass でも上書き可能）
 */
defineOptions({ inheritAttrs: false });

const props = defineProps<{
  label?: string;
  type?: string;
  modelValue: string | number;
  error?: string;
  appendIcon?: string;
  size?: 'sm' | 'base' | 'lg'; // ★ 追加
  /** <input> に適用するクラス（高さ・幅・行高・余白などを直接上書き） */
  inputClass?: string;
  /** ラッパ div に適用するクラス（デフォルト mb-4） */
  wrapperClass?: string;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'append-click'): void;
  (e: 'blur'): void;
}>();

const onInput = (e: Event) => {
  emits('update:modelValue', (e.target as HTMLInputElement).value);
};

const attrs = useAttrs();
// class は wrapper 側で制御するので除外し、その他は input にフォワード
const attrsNoClass = computed(() => {
  const { class: _c, ...rest } = attrs as Record<string, unknown>;
  return rest;
});

// wrapper のデフォルトを mb-4 に
const wrapperClass = computed(() => props.wrapperClass ?? 'mb-4');

// BaseButton と高さを揃える（h-9/h-10/h-11）
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm h-9 px-3'; // py は使わず h-* で高さ統一
    case 'lg':
      return 'text-lg h-11 px-4';
    default:
      return 'text-base h-10 px-3'; // base
  }
});
</script>
