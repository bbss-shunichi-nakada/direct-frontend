<template>
  <div class="max-w-2xl mx-auto px-6 py-24 text-center">
    <div class="text-5xl text-green-500 mb-6">✔</div>
    <h1 class="text-2xl font-semibold text-gray-900 mb-4">ご注文ありがとうございます！</h1>
    <p class="text-gray-600 mb-6">
      ご注文内容を確認のうえ、発送の準備を進めてまいります。
      <br />
      ご登録のメールアドレスに確認メールをお送りしました。
    </p>

    <div class="text-left text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded p-4 mb-6">
      <p>
        <strong>注文番号：</strong>
        #1234567890
      </p>
      <p>
        <strong>お届け先：</strong>
        東京都千代田区サンプル1-2-3
      </p>
      <p>
        <strong>合計金額：</strong>
        ¥12,800（税込）
      </p>
    </div>

    <div class="flex justify-center gap-4">
      <NuxtLink
        to="/"
        class="inline-block bg-gray-900 text-white text-center px-6 py-2 rounded-full text-sm hover:opacity-90 transition"
      >
        ショップに戻る
      </NuxtLink>

      <NuxtLink
        to="/purchase-history"
        class="inline-block border border-gray-300 text-gray-700 text-center px-6 py-2 rounded-full text-sm hover:bg-gray-50 transition"
      >
        購入履歴を見る
      </NuxtLink>
    </div>
  </div>
</template>
