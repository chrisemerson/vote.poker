import {writable} from 'svelte/store';
import {socket} from '../socket'

export default (function () {
    const { subscribe, set, update } = writable({
        id: '',
        settings: {}
    });

    socket.addEventListener('message', function (event) {
        console.log("Server message received (room store)!");
        console.log(event);
    });

    return {
        subscribe,
        create: () => {
            console.log("Sending create room command to server");
            socket.send(JSON.stringify({
                "action": "createroom"
            }))
        },
        changeSettings: (newSettings) => {
            console.log("Sending change room settings command to server");
            socket.send({
                "action": "changeroomsettings",
                "data": {
                    "settings": newSettings
                }
            })
        }
    }
})();