<template>
  <div
    class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8"
  >
    <!-- 左：購入者入力フォーム -->
    <div class="lg:col-span-2 space-y-8">
      <h1 class="text-2xl font-semibold text-gray-900">購入手続き</h1>
      <template v-if="!isLoggedIn">
        <h2 class="text-2xl font-semibold text-gray-900">会員登録</h2>
        <!-- メール・パスワード -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >メールアドレス</label
          >
          <input type="email" class="input" v-model="email" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >パスワード</label
          >
          <input type="password" class="input" v-model="password" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >パスワード（再確認）</label
          >
          <input type="password" class="input" v-model="password" required />
        </div>

        <!-- メルマガ -->
        <div class="flex items-center">
          <input
            type="checkbox"
            id="newsletter"
            v-model="newsletter"
            class="mr-2"
          />
          <label for="newsletter" class="text-sm text-gray-700"
            >お得な情報をメールで受け取る</label
          >
        </div>

        <h2 class="text-2xl font-semibold text-gray-900">お届け先</h2>
        <!-- 氏名・カナ -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >氏名</label
            >
            <input type="text" class="input" v-model="name" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >フリガナ</label
            >
            <input type="text" class="input" v-model="kana" />
          </div>
        </div>

        <!-- 住所 -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >郵便番号</label
            >
            <input type="text" class="input" v-model="postalCode" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >都道府県</label
            >
            <input type="text" class="input" v-model="prefecture" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >市区町村・番地</label
            >
            <input type="text" class="input" v-model="address" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              建物名・部屋番号（任意）
            </label>
            <input type="text" class="input" v-model="building" />
          </div>
        </div>

        <!-- 電話番号 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >電話番号</label
          >
          <input type="tel" class="input" v-model="phone" />
        </div>
      </template>

      <h2 class="text-2xl font-semibold text-gray-900">お支払い</h2>
      <!-- クレジットカード -->
      <div class="space-y-4">
        <input
          type="text"
          placeholder="カード番号"
          class="input"
          v-model="cardNumber"
        />
        <div class="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="有効期限 (MM/YY)"
            class="input"
            v-model="cardExpiry"
          />
          <input
            type="text"
            placeholder="セキュリティコード"
            class="input"
            v-model="cardCvc"
          />
        </div>
        <BaseButton
          @click="handleCheckout"
          class="w-full bg-gray-900 text-white py-2 rounded-full text-sm"
        >
          今すぐ支払う
        </BaseButton>
      </div>
    </div>

    <!-- 右カラム：追従カート -->
    <div class="relative">
      <div class="sticky top-20 bg-gray-50 border border-gray-200 rounded p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">注文内容</h2>
        <div
          v-for="item in cartItems"
          :key="item.name"
          class="flex justify-between items-center mb-4"
        >
          <div class="flex items-center space-x-4">
            <img
              :src="item.image"
              alt="item.name"
              class="w-12 h-12 object-cover rounded"
            />
            <div class="text-sm text-gray-800">{{ item.name }}</div>
          </div>
          <div class="text-sm text-gray-900 font-medium whitespace-nowrap">
            ¥{{ item.price.toLocaleString() }}
          </div>
        </div>
        <div class="mt-4 border-t pt-4 text-right">
          <div class="text-sm text-gray-500 mb-1">税込</div>
          <div class="text-lg font-bold text-gray-900">
            合計 ¥{{ totalPrice.toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#app';
import { useUserStore } from '~/stores/user';
import { useCartStore } from '~/stores/cart';
import { useAuth } from '~/composables/useAuth';

// ===== APIベースURLの正規化（.env が .../api でも ... でも動く）
const config = useRuntimeConfig();
const raw = config.public.apiBaseUrl || 'http://localhost:3001';
const base = raw.replace(/\/$/, '');
const apiBase = base.endsWith('/api') ? base : `${base}/api`;

// ===== ストア
const user = useUserStore();
const cart = useCartStore();
const { login } = useAuth();

import { signupSchema } from '~/schemas/signupSchema';

// ===== templateで使われているv-model用の変数（未定義だったので明示的に用意）
const email = ref<string>(''); // 会員登録用
const password = ref<string>(''); // 会員登録用
const name = ref<string>(''); // 請求先/お届け先（UIだけで使う）
const kana = ref<string>(''); // 〃
const postalCode = ref<string>(''); // 〃
const prefecture = ref<string>(''); // 〃
const address = ref<string>(''); // 〃
const building = ref<string>(''); // 〃
const phone = ref<string>(''); // 〃
const newsletter = ref<boolean>(false); // 〃
const cardNumber = ref<string>(''); // 〃（ダミー/決済外）
const cardExpiry = ref<string>(''); // 〃
const cardCvc = ref<string>(''); // 〃

// ===== 表示・集計（templateが参照するキー名に合わせる）
const isLoggedIn = computed(() => user.isLoggedIn);
const cartItems = computed(() => cart.items); // template内の v-for に合わせる
const totalPrice = computed(() =>
  cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
);

// ===== 進行状態/エラー
const pending = ref(false);
const errorMsg = ref('');

// JSONでない応答でも落ちない小ヘルパ
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// 必要に応じてサインアップ → ログイン
const ensureSignedIn = async (): Promise<boolean> => {
  if (isLoggedIn.value) return true;

  // 入力が両方ある場合だけ signup 実行（片方だけはエラー）
  if (!email.value && !password.value) {
    alert(
      '購入にはログインまたは会員登録が必要です。メールとパスワードを入力してください。'
    );
    return false;
  }
  if (!email.value || !password.value) {
    alert('メールアドレスとパスワードを両方入力してください。');
    return false;
  }

  // 1) サインアップ
  const su = await fetch(`${apiBase}/users/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value }),
  });
  if (!su.ok) {
    const b = await safeJson(su);
    const msg = b?.detail ?? b?.message ?? '会員登録に失敗しました';
    alert(msg);
    return false;
  }

  // 2) 直後にログイン
  const ok = await login(email.value, password.value);
  if (!ok) {
    alert('ログインに失敗しました');
    return false;
  }
  return true;
};

// 単品の注文作成（バックエンド: POST /api/orders { productId, quantity }）
async function createOneOrder(productId: number, quantity: number) {
  const res = await fetch(`${apiBase}/orders`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(user.accessToken
        ? { Authorization: `Bearer ${user.accessToken}` }
        : {}),
    },
    body: JSON.stringify({ productId, quantity }),
  });
  const body = await safeJson(res);
  return { ok: res.ok, status: res.status, body };
}

// 既存ボタンが呼ぶハンドラ
const placeOrder = async () => {
  if (pending.value) return;
  if (!cart.items.length) return alert('カートが空です');

  // ★未ログインなら、会員登録欄が埋まっている場合は signup→login を実行
  const signed = await ensureSignedIn();
  if (!signed) return;

  pending.value = true;
  errorMsg.value = '';
  try {
    let lastOrderId: number | string | null = null;

    // バックエンド仕様上、商品ごとに1件ずつ作成
    for (const i of cart.items) {
      const productId = Number(i.id);
      const quantity = Number(i.quantity);
      if (
        !Number.isFinite(productId) ||
        !Number.isFinite(quantity) ||
        quantity <= 0
      )
        continue;

      const r = await createOneOrder(productId, quantity);
      if (!r.ok) {
        const msg =
          r.body?.detail ??
          r.body?.message ??
          `注文作成に失敗しました（${r.status}）`;
        alert(msg);
        return;
      }
      const b = r.body ?? {};
      lastOrderId =
        b?.id ?? b?.orderId ?? b?.data?.id ?? b?.data?.orderId ?? null;
    }

    cart.clear();
    await navigateTo(
      lastOrderId
        ? `/thanks?orderId=${encodeURIComponent(String(lastOrderId))}`
        : '/thanks'
    );
  } catch (e: any) {
    errorMsg.value = e?.message ?? '購入処理でエラーが発生しました';
    alert(errorMsg.value);
  } finally {
    pending.value = false;
  }
};

// template側が参照している関数名にエイリアス（テンプレ無改変で動かす）
const handleCheckout = placeOrder;
const onPurchase = placeOrder;
const confirmPurchase = placeOrder;
const submitOrder = placeOrder;
</script>
