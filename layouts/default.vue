<template>
  <div class="flex flex-col min-h-screen">
    <HeaderComponent />
    <main class="flex-grow">
      <slot />
    </main>
    <FooterComponent />
  </div>
</template>
