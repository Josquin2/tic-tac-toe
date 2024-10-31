import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { io } from 'socket.io-client';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "online.client",
  __ssrInlineRender: true,
  setup(__props) {
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
      var _a, _b;
      console.log("something happened", servTurn);
      const position = servTurn.split("_")[1].split("-");
      console.log(position);
      const x = Number(position[0]);
      const y = Number(position[1]);
      console.log(`x: ${x}, y: ${y}`);
      squares.value[y][x].value = turn.value;
      (_b = (_a = (void 0).getElementById(`x-${x}-y-${y}`)) == null ? void 0 : _a.classList) == null ? void 0 : _b.add(turn.value);
      dirtySquares.value.push(`${squares.value[y][x].value}_${x}-${y}`);
      if (dirtySquares.value.length > 5) {
        checkSquares();
      }
      checkWin();
      changeSign();
      console.log("here is the emit", servTurn, " position : ", position);
    });
    socket.on("receive_message", (data) => {
      console.log("Received message:", data);
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
        { position_x: 2, position_y: 0, value: "null" }
      ],
      [
        { position_x: 0, position_y: 1, value: "null" },
        { position_x: 1, position_y: 1, value: "null" },
        { position_x: 2, position_y: 1, value: "null" }
      ],
      [
        { position_x: 0, position_y: 2, value: "null" },
        { position_x: 1, position_y: 2, value: "null" },
        { position_x: 2, position_y: 2, value: "null" }
      ]
    ]);
    const winningPositions = ref([
      { x: [0, 1, 2], y: [0, 0, 0] },
      { x: [0, 1, 2], y: [1, 1, 1] },
      { x: [0, 1, 2], y: [2, 2, 2] },
      { x: [0, 0, 0], y: [0, 1, 2] },
      { x: [1, 1, 1], y: [0, 1, 2] },
      { x: [2, 2, 2], y: [0, 1, 2] },
      { x: [0, 1, 2], y: [0, 1, 2] },
      { x: [0, 1, 2], y: [2, 1, 0] }
    ]);
    function checkWin() {
      for (const position of winningPositions.value) {
        const { x, y } = position;
        const values = x.map((_, index) => squares.value[y[index]][x[index]].value);
        if (values.every((value) => value === "cross") || values.every((value) => value === "circle")) {
          console.log(values[0]);
          alertWinner(values[0]);
        }
      }
    }
    function alertWinner(sign) {
      alert(`winner is ${sign}`);
    }
    function checkSquares() {
      var _a;
      if (dirtySquares.value.length > 6) {
        deleteFirst();
      }
      const position = dirtySquares.value[0].split("_")[1].split("-");
      const itemClass = (_a = (void 0).getElementById(
        `x-${position[0]}-y-${position[1]}`
      )) == null ? void 0 : _a.classList;
      itemClass == null ? void 0 : itemClass.add("disappearing");
    }
    function deleteFirst() {
      var _a;
      const position = dirtySquares.value[0].split("_")[1].split("-");
      const itemClass = (_a = (void 0).getElementById(
        `x-${position[0]}-y-${position[1]}`
      )) == null ? void 0 : _a.classList;
      itemClass == null ? void 0 : itemClass.remove(`${dirtySquares.value[0].split("_")[0]}`);
      itemClass == null ? void 0 : itemClass.remove("disappearing");
      squares.value[Number(position[1])][Number(position[0])].value = "null";
      dirtySquares.value.shift();
    }
    function changeSign() {
      if (turn.value == "cross")
        turn.value = "circle";
      else
        turn.value = "cross";
    }
    const dirtySquares = ref([]);
    const turn = ref("cross");
    const currentRoomName = ref("");
    const playingVersus = ref({});
    const onlineUsers = ref(0);
    const mySign = ref("");
    const searchingUser = ref("Searching...");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "online-page" }, _attrs))}><div class="searching-status">`);
      if (unref(mySign) == "") {
        _push(`<p>online: ${ssrInterpolate(unref(onlineUsers))}</p>`);
      } else {
        _push(`<p>your sign is: ${ssrInterpolate(unref(mySign))}</p>`);
      }
      _push(`<h4>${ssrInterpolate(unref(searchingUser))}</h4></div><div class="main-game"><!--[-->`);
      ssrRenderList(unref(squares), (line_x, index) => {
        _push(`<div class="x-line"><!--[-->`);
        ssrRenderList(line_x, (line_y, index2) => {
          _push(`<div class="one-square"${ssrRenderAttr("id", `x-${line_y.position_x}-y-${line_y.position_y}`)}></div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/online.client.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=online.client-7BUV-wBp.mjs.map
