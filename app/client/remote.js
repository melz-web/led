import { useCallback, useEffect, useState } from 'react';

const remote = new EventTarget();
remote.state = { on: false, hue: 0, saturation: 0, value: 255 };

const url = new URL(location.href);
url.protocol = (process.env['NODE_ENV'] === 'production') ? 'wss' : 'ws';
url.pathname = 'state';

let socket;

(function connect() {
  socket = new WebSocket(url);
  socket.onmessage = (message) => {
    remote.state = JSON.parse(message.data);
    remote.dispatchEvent(new Event('update'));
  };
  socket.onclose = () => setTimeout(connect, 1000);
})();

function useRemote(attribute) {
  const [value, overrideValue] = useState(remote.state[attribute]);

  const setValue = useCallback((value) => {
    overrideValue(value);
    socket?.send(JSON.stringify({ [attribute]: value }));
  }, []);

  const handleMessage = useCallback(() => {
    overrideValue(remote.state[attribute]);
  }, []);

  useEffect(() => {
    remote.addEventListener('update', handleMessage);
    return () => remote.removeEventListener('update', handleMessage);
  }, []);

  return [value, setValue];
}

export { useRemote };
export default remote;
