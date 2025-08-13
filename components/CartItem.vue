<template>
  <div class="flex gap-4 items-center py-4 border-b">
    <img v-if="img" :src="img" alt="" class="w-20 h-20 object-cover rounded" />

    <div class="flex-1 min-w-0">
      <div class="font-medium truncate">{{ name }}</div>
      <div class="text-sm text-gray-500">{{ jpy(price) }}</div>
    </div>

    <div class="flex items-center gap-2" aria-label="数量調整">
      <BaseButton
        size="sm"
        variant="outline"
        :disabled="busy || qty <= 1"
        @click="dec"
        aria-label="数量を減らす"
        >-</BaseButton
      >

      <!-- BaseInput を数値入力に活用 -->
      <BaseInput
        class="w-20 text-center"
        type="number"
        :min="1"
        :disabled="busy"
        v-model.number="qty"
        @blur="onInputCommit(qty)"
        aria-label="数量入力"
      />

      <BaseButton
        size="sm"
        variant="outline"
        :disabled="busy"
        @click="inc"
        aria-label="数量を増やす"
        >+</BaseButton
      >
    </div>

    <div class="w-28 text-right font-semibold">{{ jpy(price * qty) }}</div>

    <BaseButton
      class="ml-2"
      variant="warning"
      size="sm"
      @click="onDelete"
      aria-label="商品を削除"
    >
      <template #icon>
        <TrashIcon class="w-4 h-4" />
      </template>
      削除
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { jpy } from '~/utils/price';
import { useCart } from '~/composables/useCart';
import { TrashIcon } from '@heroicons/vue/24/solid';

const props = defineProps<{
  id: string;
  name: string;
  price: number;
  qty: number;
  img?: string;
}>();

const { setQuantity, remove, pending } = useCart();
const qty = ref(props.qty);

watch(
  () => props.qty,
  (v) => {
    qty.value = v;
  }
); // 親からの更新を反映

const busy = computed(() => !!pending.value[props.id]);

const inc = async () => {
  const next = qty.value + 1;
  qty.value = next;
  const ok = await setQuantity(props.id, next);
  if (!ok) qty.value--; // 失敗時は戻す
};

const dec = async () => {
  if (qty.value <= 1) return;
  const next = qty.value - 1;
  qty.value = next;
  const ok = await setQuantity(props.id, next);
  if (!ok) qty.value++; // 失敗時は戻す
};

const onInputCommit = async (v: number) => {
  const n = Number.isFinite(v) ? Math.max(1, Math.floor(v)) : 1;
  qty.value = n;
  const ok = await setQuantity(props.id, n);
  if (!ok) qty.value = props.qty;
};

const onDelete = () => remove(props.id);
</script>
