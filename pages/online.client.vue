<script setup lang="ts">
import { io } from "socket.io-client";

const socket = io();

const isConnected = ref(false);
const transport = ref("N/A");

if (socket.connected) {
  onConnect();
}

function onConnect() {
  isConnected.value = true;
  transport.value = socket.io.engine.transport.name;

  socket.io.engine.on("upgrade", (rawTransport) => {
    transport.value = rawTransport.name;
  });

  socket.emit("user-in-queue", JSON.parse(localStorage.getItem("user")));
}

function onDisconnect() {
  isConnected.value = false;
  transport.value = "N/A";
}

socket.on("connect", onConnect);
socket.on("disconnect", onDisconnect);

socket.on("start-game", ({ roomName, user, opponent }) => {
  searchingUser.value = `Your opponent is: ${opponent.username}`;
  currentRoomName.value = roomName;
  playingVersus.value = opponent;
  console.log(user);
  mySign.value = user.sign;

  socket.emit("join-room", roomName);
});

socket.on("turn-get", (servTurn) => {
  console.log("something happened", servTurn);
  const position = servTurn.split("_")[1].split("-");

  console.log(position);

  const x = Number(position[0]);
  const y = Number(position[1]);

  console.log(`x: ${x}, y: ${y}`);

  squares.value[y][x].value = turn.value;

  document.getElementById(`x-${x}-y-${y}`)?.classList?.add(turn.value);
  dirtySquares.value.push(`${squares.value[y][x].value}_${x}-${y}`);
  if (dirtySquares.value.length > 5) {
    checkSquares();
  }
  checkWin();
  changeSign();

  console.log("here is the emit", servTurn, " position : ", position);
});

function myTurn(turn: string) {
  socket.emit("turn-post", currentRoomName.value, turn);
}

onBeforeUnmount(() => {
  socket.off("connect", onConnect);
  socket.off("disconnect", onDisconnect);
});

function sendMessage() {
  const data = "Your message here"; // или message.value если будет ввод
  socket.emit("message", data);
}

socket.on("receive_message", (data) => {
  console.log("Received message:", data);
  // Добавьте обработку данных, например, обновление массива сообщений
});

socket.on("users_count", (count) => {
  onlineUsers.value = count;
});

socket.on("get-queue-length", (users) => {
  console.log(`users in queue: ${users}`);
});

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
      console.log(values[0]);
      alertWinner(values[0]);
    }
  }
}

function alertWinner(sign: string) {
  alert(`winner is ${sign}`);
}
function onSquareClick(position_x: number, position_y: number) {
  for (let y = 0; y < squares.value.length; y++) {
    if (y == position_y) {
      for (let x = 0; x < squares.value[y].length; x++) {
        if (x == position_x) {
          if (mySign.value == turn.value) {
            squares.value[y][x].value = turn.value;
            document
              .getElementById(`x-${x}-y-${y}`)
              ?.classList?.add(turn.value);
            dirtySquares.value.push(`${squares.value[y][x].value}_${x}-${y}`);
            console.log(squares);
            myTurn(`${squares.value[y][x].value}_${x}-${y}`);
            if (dirtySquares.value.length > 5) {
              checkSquares();
            }
            checkWin();
            changeSign();
          }
        }
      }
    }
  }
}

function checkSquares() {
  if (dirtySquares.value.length > 6) {
    deleteFirst();
  }
  const position = dirtySquares.value[0].split("_")[1].split("-");

  const itemClass = document.getElementById(
    `x-${position[0]}-y-${position[1]}`
  )?.classList;

  itemClass?.add("disappearing");
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
const currentRoomName = ref("");
const playingVersus = ref({});
const onlineUsers = ref(0);
const mySign = ref("");
const searchingUser = ref("Searching...");
</script>

<template>
  <div class="online-page">
    <div class="searching-status">
      <p v-if="mySign == ''">online: {{ onlineUsers }}</p>
      <p v-else>your sign is: {{ mySign }}</p>
      <h4>{{ searchingUser }}</h4>
    </div>
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
  </div>
</template>

<style lang="scss">
.online-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .searching-status {
    text-align: center;
  }
}
</style>
