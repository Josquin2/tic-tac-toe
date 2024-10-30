<script setup lang="ts">
import Settings from "./Icons/Settings.vue";

function onPlayRandomClick() {
  router.push("/online");
}

const router = useRouter();
</script>

<template>
  <div class="play-block left--block">
    <button class="play--button" @click="onPlayRandomClick">Play Random</button>
    <button class="play--button">Play Friend</button>
    <button class="play--button settings--button">
      <Settings />
    </button>
  </div>
</template>

<style lang="scss">
.play-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-height: 9.5rem;
  gap: 1.75rem;

  .play--button {
    transition: 0.2s;
    width: 12.5rem;
    height: 3.5rem;
    background-color: #575757;
    border-radius: 0.5rem;
    font-size: 1rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  .play--button:hover {
    background-color: #505050;
    box-shadow: 0 8px 12px -2px rgb(0 0 0 / 0.3),
      0 4px 8px -4px rgb(0 0 0 / 0.3);
  }

  .settings--button {
    width: 3.5rem !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
