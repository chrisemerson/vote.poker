export const socket = new WebSocket('wss://api.bjss.poker')

socket.onopen = function () {
    console.log("Connected to the socket!");
};

socket.onclose = function () {
    console.log("Disconnected from socket :(")
};
