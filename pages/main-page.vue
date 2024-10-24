<script setup lang="ts">
const squares = ref([
  [
    { position_x: 0, position_y: 0, value: "null" },
    { position_x: 1, position_y: 0, value: "null" },
    { position_x: 2, position_y: 0, value: "null" },
  ],
  [
    { position_x: 0, position_y: 1, value: "null" },
    { position_x: 1, position_y: 1, value: "null" },
    { position_x: 2, position_y: 1, value: "null" },
  ],
  [
    { position_x: 0, position_y: 2, value: "null" },
    { position_x: 1, position_y: 2, value: "null" },
    { position_x: 2, position_y: 2, value: "null" },
  ],
]);

const winningPositions = ref([
  { x: [0, 1, 2], y: [0, 0, 0] },
  { x: [0, 1, 2], y: [1, 1, 1] },
  { x: [0, 1, 2], y: [2, 2, 2] },
  { x: [0, 0, 0], y: [0, 1, 2] },
  { x: [1, 1, 1], y: [0, 1, 2] },
  { x: [2, 2, 2], y: [0, 1, 2] },
  { x: [0, 1, 2], y: [0, 1, 2] },
  { x: [0, 1, 2], y: [2, 1, 0] },
]);

function checkWin() {
  for (const position of winningPositions.value) {
    const { x, y } = position;
    const values = x.map((_, index) => squares.value[y[index]][x[index]].value);

    if (
      values.every((value) => value === "cross") ||
      values.every((value) => value === "circle")
    ) {
      console.log("WINNING");
    }
  }
  console.log("not winning");
}
function onSquareClick(position_x: number, position_y: number) {
  for (let y = 0; y < squares.value.length; y++) {
    if (y == position_y) {
      for (let x = 0; x < squares.value[y].length; x++) {
        if (x == position_x) {
          squares.value[y][x].value = turn.value;
          document.getElementById(`x-${x}-y-${y}`)?.classList?.add(turn.value);
          dirtySquares.value.push(`${squares.value[y][x].value}_${x}-${y}`);
          console.log(squares);
          // bug
          // winning check is earlier than sign disappears
          //
          checkWin();

          changeSign();
        }
      }
    }
  }
}

function checkSquares() {
  const position = dirtySquares.value[0].split("_")[1].split("-");

  const itemClass = document.getElementById(
    `x-${position[0]}-y-${position[1]}`
  )?.classList;

  itemClass?.add("disappearing");

  if (dirtySquares.value.length > 6) {
    deleteFirst();
  }
}

function deleteFirst() {
  const position = dirtySquares.value[0].split("_")[1].split("-");

  const itemClass = document.getElementById(
    `x-${position[0]}-y-${position[1]}`
  )?.classList;

  itemClass?.remove(`${dirtySquares.value[0].split("_")[0]}`);
  itemClass?.remove("disappearing");

  squares.value[Number(position[1])][Number(position[0])].value = "null";
  dirtySquares.value.shift();
}

function changeSign() {
  if (turn.value == "cross") turn.value = "circle";
  else turn.value = "cross";
}

const dirtySquares: Ref<Array<string>> = ref([]);
const turn = ref("cross");

watch(dirtySquares.value, () => {
  if (dirtySquares.value.length > 5) {
    checkSquares();
  }
});
</script>

<template>
  <div class="main-page">
    <div class="main-game">
      <div class="x-line" v-for="(line_x, index) in squares" :key="index">
        <div
          class="one-square"
          :id="`x-${line_y.position_x}-y-${line_y.position_y}`"
          v-for="(line_y, index) in line_x"
          :key="index"
          @click="onSquareClick(line_y.position_x, line_y.position_y)"
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

    .cross::before,
    .cross::after,
    .circle::before,
    .circle::after {
      content: "";
      position: absolute;
      top: 50%;
      transition: 0.5s;
    }

    .cross::before,
    .cross::after {
      background-color: #ff7070;
      width: 0.25rem;
      height: 5rem;
    }

    .circle::before,
    .circle::after {
      border-radius: 50%;
    }

    .cross::before {
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }

    .cross::after {
      right: 50%;
      transform: translate(50%, -50%) rotate(-45deg);
    }

    .circle::before {
      left: 50%;
      transform: translate(-50%, -50%);
      width: 5rem;
      height: 5rem;
      background-color: #6786ff;
    }

    .circle::after {
      right: 50%;
      transform: translate(50%, -50%);
      width: 4.5rem;
      height: 4.5rem;
      background-color: #ffffff;
      opacity: 1 !important;
    }

    .disappearing::before,
    .disappearing::after {
      opacity: 0.2;
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
