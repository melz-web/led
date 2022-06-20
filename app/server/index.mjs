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

const webSocketServer = new WebSocketServer({ server, path: '/state', });
webSocketServer.on('connection', (webSocket) => {
  console.log('connected');
  webSocket.send(JSON.stringify({ test: 'state' }));
});
