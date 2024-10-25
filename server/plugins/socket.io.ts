import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import { socket } from "~/components/socket";
import { User } from "~/types/User";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  let onlineUsers = 0;
  const onlineQueue: Array<User> = [];

  function findRandomUsersGame(requestingUser: User) {
    if (onlineQueue.length > 1) {
      const index1 = onlineQueue.findIndex(
        (user) => user.id === requestingUser.id
      ); // Ищем пользователя, отправившего запрос
      let index2 = Math.floor(Math.random() * onlineQueue.length);

      while (index1 === index2 || index1 < 0) {
        // Проверяем, чтобы индексы не совпадали и пользователь был найден
        index2 = Math.floor(Math.random() * onlineQueue.length);
      }

      if (onlineQueue[index1].id == onlineQueue[index2].id) {
        console.log("error");
        console.log(onlineQueue.length);
        onlineQueue.filter((user) => user.id != requestingUser.id);
        return;
      }

      const user1 = onlineQueue[index1];
      const user2 = onlineQueue[index2];

      // Назначаем символы случайным образом
      if (Math.random() > 0.5) {
        user1.sign = "cross";
        user2.sign = "circle";
      } else {
        user1.sign = "circle";
        user2.sign = "cross";
      }

      // Создаем уникальное имя для комнаты
      const roomName = `game-room-${user1.id}-${user2.id}`;

      // Отправляем обоим пользователям информацию о созданной комнате и их символах

      io.to(user1.socketId).emit("start-game", {
        roomName,
        user: user1,
        opponent: user2,
      });
      io.to(user2.socketId).emit("start-game", {
        roomName,
        user: user2,
        opponent: user1,
      });

      console.log("aaaaaaaa", onlineQueue.length);

      // Удаляем пользователей из очереди
      onlineQueue.splice(index1, 1);
      onlineQueue.splice(index2, 1);

      console.log("fdsfs", onlineQueue.length);
      console.log(user1, user2, roomName);
      return { user1, user2, roomName };
    } else {
      console.log("Не хватает пользователей для игры");
    }
  }

  io.on("connection", (socket) => {
    onlineUsers += 1;
    console.log(onlineQueue);
    io.emit("users_count", onlineUsers);

    socket.on("message", (data) => {
      console.log("Received message:", data);

      // Broadcast the message to other clients
      socket.broadcast.emit("receive_message", data);
    });

    socket.on("user-in-queue", (data: User) => {
      const existingUserIndex = onlineQueue.findIndex(
        (user) => user.id === data.id
      );

      // Проверка на наличие пользователя в очереди
      if (existingUserIndex === -1) {
        const user = { ...data, socketId: socket.id };
        onlineQueue.push(user);
        findRandomUsersGame(user);
      } else {
        // Обновляем socketId пользователя, если он уже в очереди
        onlineQueue[existingUserIndex].socketId = socket.id;
      }

      io.emit("get-queue-length", onlineQueue.length);
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
      onlineUsers -= 1;
      io.emit("users_count", onlineUsers);
    });

    socket.on("turn-post", (roomName, turn) => {
      console.log(roomName, turn);
      socket.to(roomName).emit("turn-get", turn);
    });

    socket.on("join-room", (room) => {
      socket.join(room);
    });
  });

  nitroApp.router.use(
    "/socket.io/",
    defineEventHandler({
      handler(event) {
        engine.handleRequest(event.node.req, event.node.res);
        event._handled = true;
      },
      websocket: {
        open(peer) {
          // @ts-expect-error private method and property
          engine.prepare(peer._internal.nodeReq);
          // @ts-expect-error private method and property
          engine.onWebSocket(
            peer._internal.nodeReq,
            peer._internal.nodeReq.socket,
            peer.websocket
          );
        },
      },
    })
  );
});

// game logic
