<template>
  <div class="flex flex-col min-h-screen">
    <BaseHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>
