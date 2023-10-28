import {writable} from 'svelte/store';
import socket from '../socket'

export default (function () {
    const { subscribe, update } = writable({
        id: '',
        owner: '',
        votes_revealed: false,
        settings: {}
    });

    let room_id = "";
    let saved_name = "";
    let saved_observer = false;

    socket.addEventListener('message', function (event) {
        const message = JSON.parse(event.data);

        if (!isProduction) {
            console.log("Message received from server: " + message.action);
            console.log(message.data);
        }

        switch (message.action) {
            case 'roomcreated':
                join(message.data.room_id, saved_name, saved_observer);
                break;

            case 'roomsettingschanged':
                room_id = message.data.room_id;

                update((room) => {
                    return {
                        id: room_id,
                        owner: message.data.room_owner,
                        votes_revealed: message.data.votes_revealed,
                        settings: message.data.room_settings
                    };
                });

                window.history.pushState(
                    { room_id: room_id },
                    '',
                    '?' + room_id
                );
                break;

            case 'votesreset':
                update((room) => {
                    return {
                        id: room.id,
                        owner: room.owner,
                        votes_revealed: false,
                        settings: room.settings
                    };
                });
                break;
        }
    });

    const sendMessageToServer = function (action, messageData) {
        if (!isProduction) {
            console.log("Sending message to server: " + action);
            console.log(messageData)
        }

        socket.send(JSON.stringify({
            "action": action,
            "data": messageData
        }));
    };

    const create = function (name, observer) {
        saved_name = name;
        saved_observer = observer;

        sendMessageToServer('createroom', {
            "settings": {
                "test": "test"
            }
        })
    };

    const join = function (room_id, name, observer) {
        sendMessageToServer('joinroom', {
            "room_id": room_id,
            "name": name,
            "settings": {
                "observer": observer
            }
        });
    };

    const changeSettings = function (new_settings) {
        update((room) => {
            return {
                id: room.id,
                owner: room.room_owner,
                votes_revealed: room.votes_revealed,
                settings: new_settings
            };
        });

        sendMessageToServer('changeroomsettings', {
            "room_id": room_id,
            "settings": new_settings
        });
    };

    const revealVotes = function () {
        sendMessageToServer('revealvotes', {
            "room_id": room_id
        });
    };

    const resetVotes = function () {
        sendMessageToServer('resetvotes', {
            "room_id": room_id
        });
    };

    const fetchRoomInfo = function (joining_room_id) {
        sendMessageToServer('getroominfo', {
            "room_id": joining_room_id
        });
    };

    return {
        subscribe,
        create,
        join,
        changeSettings,
        revealVotes,
        resetVotes,
        fetchRoomInfo
    }
})();
