<template>
  <footer class="bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
    <div class="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
      <!-- サイト情報 -->
      <div>
        <h2 class="font-semibold text-gray-800 mb-2">BBSS Online</h2>
        <p>安心・安全を届けるセキュリティ製品の専門サイト</p>
      </div>

      <!-- ヘルプ -->
      <div>
        <h3 class="font-semibold text-gray-800 mb-2">サポート</h3>
        <ul class="space-y-1">
          <li><NuxtLink to="/faq" class="hover:underline">よくあるご質問</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:underline">お問い合わせ</NuxtLink></li>
        </ul>
      </div>

      <!-- その他リンク -->
      <div>
        <h3 class="font-semibold text-gray-800 mb-2">その他</h3>
        <ul class="space-y-1">
          <li><NuxtLink to="/terms" class="hover:underline">利用規約</NuxtLink></li>
          <li><NuxtLink to="/privacy" class="hover:underline">プライバシーポリシー</NuxtLink></li>
        </ul>
      </div>
    </div>

    <!-- 下部 -->
    <div class="text-center py-4 border-t border-gray-100 text-xs">
      &copy; {{ new Date().getFullYear() }} BBSS Online. All rights reserved.
    </div>
  </footer>
</template>
