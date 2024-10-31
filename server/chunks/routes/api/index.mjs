import { a as defineWebSocketHandler } from '../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'events';
import 'https';
import 'http';
import 'net';
import 'tls';
import 'crypto';
import 'stream';
import 'url';
import 'zlib';
import 'buffer';
import 'node:fs';
import 'node:path';
import 'engine.io';
import 'socket.io';
import 'node:url';

const room = "ROOM";
const index = defineWebSocketHandler({
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
  }
});

export { index as default };
//# sourceMappingURL=index.mjs.map
