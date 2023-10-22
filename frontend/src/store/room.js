import {writable} from 'svelte/store';
import socket from '../socket'

export default (function () {
    const { subscribe, update } = writable({
        id: '',
        owner: '',
        votes_revealed: false,
        settings: {},
        controlsFrozen: false
    });

    let room_id = "";
    let saved_name = "";

    socket.addEventListener('message', function (event) {
        const message = JSON.parse(event.data);

        switch (message.action) {
            case 'roomcreated':
                join(message.data.room_id, saved_name);
                break;

            case 'roomsettingschanged':
                room_id = message.data.room_id;

                update((room) => {
                    let controlsFrozen = room.controlsFrozen;

                    if (!room.votes_revealed && message.data.votes_revealed) {
                        controlsFrozen = false;
                    }

                    return {
                        id: room_id,
                        owner: message.data.room_owner,
                        votes_revealed: message.data.votes_revealed,
                        settings: message.data.room_settings,
                        controlsFrozen: controlsFrozen
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
                        settings: room.settings,
                        controlsFrozen: false
                    };
                });
                break;
        }
    });

    const create = function (name) {
        saved_name = name;

        socket.send(JSON.stringify({
            "action": "createroom",
            "data": {
                "settings": {
                    "test": "test"
                }
            }
        }));
    };

    const join = function (room_id, name) {
        socket.send(JSON.stringify({
            "action": "joinroom",
            "data": {
                "room_id": room_id,
                "name": name
            }
        }));
    };

    const changeSettings = function (new_settings) {
        update((room) => {
            return {
                id: room.id,
                owner: room.room_owner,
                votes_revealed: room.votes_revealed,
                settings: new_settings,
                controlsFrozen: room.controlsFrozen
            };
        });

        socket.send(JSON.stringify({
            "action": "changeroomsettings",
            "data": {
                "room_id": room_id,
                "settings": new_settings
            }
        }));
    };

    const freezeControls = function () {
        update((room) => {
            return {
                id: room.id,
                owner: room.room_owner,
                votes_revealed: room.votes_revealed,
                settings: room.settings,
                controlsFrozen: true
            };
        });
    }

    const revealVotes = function () {
        freezeControls();

        socket.send(JSON.stringify({
            "action": "revealvotes",
            "data": {
                "room_id": room_id
            }
        }));
    };

    const resetVotes = function () {
        freezeControls();

        socket.send(JSON.stringify({
            "action": "resetvotes",
            "data": {
                "room_id": room_id
            }
        }));
    };

    const fetchRoomInfo = function (joining_room_id) {
        socket.send(JSON.stringify({
            "action": "getroominfo",
            "data": {
                "room_id": joining_room_id
            }
        }));
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
