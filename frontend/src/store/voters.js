import {writable} from 'svelte/store';
import socket from "../socket";

export default (function () {
    const { subscribe, update } = writable({
        us: "",
        my_vote: 0,
        voters: []
    });

    socket.addEventListener('message', function (event) {
        const message = JSON.parse(event.data);

        switch (message.action) {
            case 'votersupdated':
                update((voter_info) => {
                    return {
                        us: message.data.us,
                        my_vote: voter_info.my_vote,
                        voters: message.data.voters
                    };
                });
                break;

            case 'votesreset':
                update((voter_info) => {
                    return {
                        us: voter_info.us,
                        my_vote: 0,
                        voters: voter_info.voters.map((voter) => {
                            let newv = {...voter};
                            delete newv.vote;
                            newv.vote_placed = false;

                            return newv;
                        })
                    };
                });
                break;
        }
    });

    return {
        subscribe,
        placeVote: (value) => {
            update((voter_info) => {
                return {
                    us: voter_info.us,
                    my_vote: value,
                    voters: voter_info.voters.map((v) => {
                        let newv = {...v};

                        if (v.voter_id === voter_info.us) {
                            newv.vote_placed = (value !== "");
                        }

                        return newv;
                    })
                }
            });

            socket.send(JSON.stringify({
                "action": "placevote",
                "data": value
            }));

            console.log("placevote command SENT");
        }
    }
})();
