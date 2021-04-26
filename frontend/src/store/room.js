import { readable } from 'svelte/store';
import {socket} from "../socket";

export const room = readable({
    id: '',
    name: 'Test Room',
    votes_revealed: false,
    settings: {}
});

// socket.on('connection', (socket) => {
//     console.log("Web Socket connected!");
// })