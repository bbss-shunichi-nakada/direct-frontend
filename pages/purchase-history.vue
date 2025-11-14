<template>
  <div class="max-w-5xl mx-auto px-6 py-12">
    <h1 class="text-2xl font-semibold text-gray-900 mb-8">購入履歴</h1>

    <div class="space-y-6">
      <div
        v-for="(item, index) in purchases"
        :key="index"
        class="border border-gray-200 rounded p-4 flex items-center gap-6 bg-white shadow-sm"
      >
        <img
          :src="item.image"
          alt="商品画像"
          class="w-20 h-20 object-cover rounded"
        />
        <div class="flex-1">
          <h2 class="text-lg font-medium text-gray-800">{{ item.name }}</h2>
          <p class="text-sm text-gray-500">購入日：{{ item.date }}</p>
        </div>
        <div class="text-right text-gray-900 font-semibold whitespace-nowrap">
          ¥{{ item.price.toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#app';
import { useUserStore } from '~/stores/user';

const config = useRuntimeConfig();
const store = useUserStore();

// /api 付け忘れを吸収
const raw = config.public.apiBaseUrl || 'http://localhost:3001';
const base = raw.replace(/\/$/, '');
const apiBase = base.endsWith('/api') ? base : `${base}/api`;

// 既存UIに合わせた表示用
const purchases = ref<
  { name: string; price: number; date: string; image: string }[]
>([]);

// offset 方式に切り替え（NaN回避）
const limit = 20;
const offset = ref(0);
const pending = ref(false);
const hasMore = ref(true);

async function load() {
  if (pending.value || !hasMore.value) return;
  pending.value = true;
  try {
    const params = new URLSearchParams();
    params.set('limit', String(limit)); // 必ず数値文字列
    params.set('offset', String(offset.value)); // 必ず数値文字列（未定義にしない）

    const url = `${apiBase}/orders/?${params.toString()}`;
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: store.accessToken
        ? { Authorization: `Bearer ${store.accessToken}` }
        : {},
    });
    if (!res.ok) {
      console.debug('[orders] list failed', res.status);
      return;
    }
    const body: any = await res.json();

    // items / total / nextCursor などは list.ts の返却仕様に準拠
    const items = body?.items ?? body?.data?.items ?? [];
    const total = Number(body?.total ?? body?.data?.total ?? 0);

    purchases.value.push(
      ...items.map((o: any) => ({
        name: o.name ?? `注文#${o.id}`,
        price: o.total ?? 0,
        date: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '',
        image: o.imageUrl ?? '/images/isw.png',
      }))
    );

    // もっと見る判定（offset 方式）
    offset.value += limit;
    hasMore.value = purchases.value.length < total;

    // nextCursor は将来用の base64 文字列。今は使わない（必要なら body.nextCursor を保持するだけ）
  } finally {
    pending.value = false;
  }
}

onMounted(load);
</script>
