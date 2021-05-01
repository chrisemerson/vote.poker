import {writable} from 'svelte/store';
import {socket} from "../socket";

function createVotersStore() {
    const { subscribe, set, update } = writable([]);

    socket.addEventListener('message', function (event) {
        console.log("Server message received (voter store)!");
        console.log(event);
    });

    return {
        subscribe,
        changeMyName: (name) => {
            socket.send({
                "action": "changename",
                "data": {
                    "name": name
                }
            })
        }
    }
}

export default createVotersStore();
