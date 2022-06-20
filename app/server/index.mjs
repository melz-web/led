import '../../env.js';
import express from 'express';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, '../../public');

const server = express();
server.get('*', express.static(publicPath));
server.use((req, res) => res.sendFile(path.join(publicPath, 'index.html')));
server.listen(process.env['PORT'], () => {
  console.log(`Listening on port ${process.env['PORT']}.`);
});

