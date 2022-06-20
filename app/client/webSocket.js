const url = new URL(location.href);
url.protocol = 'ws';
url.pathname = 'ws';

const webSocket = new WebSocket(url);

export default webSocket;
