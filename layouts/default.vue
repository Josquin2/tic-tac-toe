<template>
  <div class="default-layout">
    <slot />
  </div>
</template>

<style lang="scss">
$background: #202020;
#__nuxt .default-layout {
  background-color: $background;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
</style>
