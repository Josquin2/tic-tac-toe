<script setup lang="ts">
function onPlayRandomClick() {
  router.push("/online");
}
const router = useRouter();
</script>

<template>
  <div class="main-page">
    <h2 style="text-align: center">Hello there!</h2>
    <div class="play-button">
      <button class="random-player-button" @click="onPlayRandomClick()">
        Play with random
      </button>
      <button>Play with friend</button>
    </div>
  </div>
</template>

<style lang="scss">
.main-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.play-button {
  display: flex;
  flex-direction: column;
  button {
    font-size: 1rem;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
  }
  .random-player-button {
    border: 1px solid #000000;
    font-size: 1.3rem;
  }
}
</style>
