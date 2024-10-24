<script setup lang="ts">
// definePageMeta({
//   middleware: "auth",
// });
const squares = [
  [
    { position_x: 0, position_y: 0, value: null },
    { position_x: 1, position_y: 0, value: null },
    { position_x: 2, position_y: 0, value: null },
  ],
  [
    { position_x: 0, position_y: 1, value: null },
    { position_x: 1, position_y: 1, value: null },
    { position_x: 2, position_y: 1, value: null },
  ],
  [
    { position_x: 0, position_y: 2, value: null },
    { position_x: 1, position_y: 2, value: null },
    { position_x: 2, position_y: 2, value: null },
  ],
];
</script>

<template>
  <div class="main-page">
    <div class="main-game">
      <div class="x-line" v-for="(line_x, index) in squares" :key="index">
        <div
          class="one-square"
          v-for="(line_y, index) in line_x"
          :key="index"
        ></div>
      </div>
    </div>

    <div class="play-button">
      <button class="random-player-button">Play with random</button>
      <button>Play with friend</button>
    </div>
  </div>
</template>

<style lang="scss">
.main-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .main-game {
    display: flex;
    flex-direction: column;
    background-color: #000000;
    gap: 0.125rem;

    .x-line {
      display: flex;
      flex-direction: row;
      gap: 0.125rem;
    }
    .one-square {
      cursor: pointer;
      width: 6rem;
      height: 6rem;
      background-color: #ffffff;
      position: relative;
    }
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
}
</style>
