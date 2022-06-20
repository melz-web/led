import '../../env.js';
import express from 'express';
import path from 'path';
import url from 'url';
import { WebSocketServer } from 'ws';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, '../../public');

const app = express();
app.use(express.static(publicPath));
app.use((req, res) => res.sendFile(path.join(publicPath, 'index.html')));

const server = app.listen(process.env['PORT'], () => {
  console.log(`Listening on port ${process.env['PORT']}.`);
});

const state = new EventTarget();
state.values = { on: false };

const sockets = new Set();
state.addEventListener('update', () => {
  console.log(state.values);
  sockets.forEach((socket) => {
    socket.send(JSON.stringify(state.values));
  });
});

const webSocketServer = new WebSocketServer({ server, path: '/state', });
webSocketServer.on('connection', (socket) => {
  sockets.add(socket);
  socket.on('message', (message) => {
    state.values = { ...state.values, ...JSON.parse(message) };
    state.dispatchEvent(new Event('update'));
  });
  socket.on('error', console.error);
  socket.on('close', () => sockets.delete(socket));
});
