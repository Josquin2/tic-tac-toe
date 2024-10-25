const room = "ROOM";

export default defineWebSocketHandler({
  open(peer) {
    console.log("opened", peer);
    peer.subscribe(room);
    peer.publish(room, "someone is there");
  },
  close(peer) {
    console.log("closed", peer);
  },
  error(peer, error) {
    console.log(peer);
    console.log(error);
  },
  message(peer, message) {
    console.log("Received message:", message.text());
    peer.publish(room, message.text());
  },
});
