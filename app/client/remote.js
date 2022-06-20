import { useCallback, useEffect, useState } from 'react';

const url = new URL(location.href);
url.protocol = 'ws';
url.pathname = 'state';

const remote = new EventTarget();
remote.state = { on: false };
remote.socket = new WebSocket(url);

remote.socket.addEventListener('message', (message) => {
  remote.state = { ...remote.state, ...JSON.parse(message.data) };
  remote.dispatchEvent(new Event('update'));
});

remote.addEventListener('update', () => {
  console.log(remote.state);
});

function useRemote(attribute) {
  const [value, overrideValue] = useState(remote.state[attribute]);

  const setValue = useCallback((value) => {
    overrideValue(value);
    remote.socket.send(JSON.stringify({ [attribute]: value }))
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
