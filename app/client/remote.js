const url = new URL(location.href);
url.protocol = 'ws';
url.pathname = 'state';

const remote = new EventTarget();
remote.state = {};
remote.socket = new WebSocket(url);

remote.socket.addEventListener('message', (message) => {
  remote.state = { ...remote.state, ...JSON.parse(message.data) };
  remote.dispatchEvent(new Event('update'));
});

remote.addEventListener('update', () => {
  console.log(remote.state);
});

export default remote;
