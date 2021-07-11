const socket = new WebSocket('wss://api.bjss.poker');

socket.addEventListener('open', () => {
    //Default AWS timeout is 10 mins so ping server with message every 5 mins to stay connected
    setInterval(() => {
        socket.send(JSON.stringify({
            "action": "ping"
        }));
    }, 5 * 60 * 1000);
});

export default socket;
