<script>
    import room from './store/room';
    import {onDestroy} from "svelte";

    let room_id = "";
    let room_settings = {};

    const unsubscribe = room.subscribe(data => {
        room_id = data.id;
        room_settings = data.settings;
    });

    onDestroy(unsubscribe);
</script>

<main>
    {#if !!$room.settings.id}
    <h2>{$room.settings.id}</h2>
    {/if}
</main>

<style>

</style>
