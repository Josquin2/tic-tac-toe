<template>
  <div class="default-layout">
    <slot />
  </div>
</template>

<style lang="scss">
.default-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
</style>
