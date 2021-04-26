<script>
    import {room} from './store/room';
    import {onDestroy} from "svelte";

    let room_id = "";
    let room_name = "";
    let room_settings = {};
    let votes_revealed = false;

    const unsubscribe = room.subscribe(data => {
        room_id = data.id;
        room_name = data.name;
        room_settings = data.settings;
        votes_revealed = data.votes_revealed;
    });





    onDestroy(unsubscribe);
</script>

<main>
    <h2>Room {$room.name}!</h2>
</main>

<style>

</style>