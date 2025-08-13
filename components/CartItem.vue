<template>
  <!-- 画像は左カラム、右は 1行目=商品名 / 2行目=金額 / 3行目=操作行 -->
  <div
    class="grid grid-cols-[80px_1fr] grid-rows-[auto_auto_auto] gap-4 py-4 border-b"
  >
    <!-- 左：画像（上2行ぶち抜き／右側の「商品名+金額」の高さに揃える） -->
    <img
      v-if="img"
      :src="img"
      alt=""
      class="w-20 self-stretch row-span-2 row-start-1 object-cover rounded"
    />

    <!-- 右：1行目＝商品名 -->
    <div class="col-start-2 row-start-1 min-w-0">
      <div class="text-base font-medium text-gray-900 break-words">
        {{ name }}
      </div>
    </div>

    <!-- 右：2行目＝金額（単価） -->
    <div class="col-start-2 row-start-2 text-sm text-gray-600">
      {{ jpy(price) }}
    </div>

    <!-- 右：3行目＝[- 数量 +]  小計  [削除]（縦サイズ統一＆右寄せ） -->
    <div class="col-start-2 row-start-3">
      <div class="flex items-center justify-end gap-3 sm:gap-4">
        <!-- 数量コントロール：全要素 h-9 で統一 -->
        <div class="flex items-center gap-2">
          <BaseButton
            size="sm"
            variant="outline"
            class="h-9 px-3"
            :disabled="busy || qty <= 1"
            @click="dec"
            aria-label="数量を減らす"
            >-</BaseButton
          >

          <BaseInput
            size="sm"
            wrapperClass="mb-0 w-16"
            inputClass="h-9 text-center leading-none p-0"
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
            class="h-9 px-3"
            :disabled="busy"
            @click="inc"
            aria-label="数量を増やす"
            >+</BaseButton
          >
        </div>

        <!-- 小計：高さ固定＋中央寄せ（ズレ解消） -->
        <div class="w-24 h-9 flex items-center justify-end font-semibold">
          {{ jpy(price * qty) }}
        </div>

        <!-- 削除：すでに h-9。念のため高さ維持 -->
        <BaseButton
          variant="warning"
          size="sm"
          class="h-9"
          @click="onDelete"
          aria-label="商品を削除"
        >
          <template #icon>
            <TrashIcon class="w-4 h-4" />
          </template>
          削除
        </BaseButton>
      </div>
    </div>
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
