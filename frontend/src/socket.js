const socket = new WebSocket('wss://api.bjss.poker');

socket.addEventListener('open', () => {
    console.log("Connected to the socket!");

    //Default AWS timeout is 10 mins so ping server with message every 5 mins to stay connected
    setTimeout(() => {
        socket.send(JSON.stringify({
            "action": "ping"
        }));
    }, 5 * 60 * 1000);
});

socket.addEventListener('close', () => {
    console.log("Disconnected from socket :(");
});

socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);

    console.log(message.action + " event RCVD");
    console.log(message);
});

export default socket;
