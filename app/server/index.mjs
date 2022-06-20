import '../../env.js';
import express from 'express';
import path from 'path';
import url from 'url';
import { WebSocketServer } from 'ws';
import State from './State.mjs';
import types from './types.mjs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, '../../public');

const app = express();
app.use(express.static(publicPath));
app.use((req, res) => res.sendFile(path.join(publicPath, 'index.html.ejs')));

const server = app.listen(process.env['PORT'], () => {
  console.log(`Listening on port ${process.env['PORT']}.`);
});

// ====

const state = new State({
  on: { type: types.boolean, initial: false },
  hue: { type: types.uint8, initial: 0 },
  saturation: { type: types.uint8, initial: 0 },
  value: { type: types.uint8, initial: 255 }
});

const pushWebSocket = (socket) => socket.send(JSON.stringify(state));

// ====

const webSockets = new Set();
state.addEventListener('change', () => webSockets.forEach(pushWebSocket));
new WebSocketServer({ server, path: '/state' }).on('connection', (socket) => {
  pushWebSocket(socket);
  webSockets.add(socket);
  socket.on('message', (message) => {
    let success;
    try {
      success = state.update(JSON.parse(message));
    } catch {
      success = false;
    }
    if (!(success))
      pushWebSocket(socket);
  });
  socket.on('error', console.error);
  socket.on('close', () => webSockets.delete(socket));
});
