<script>
    import roomStore from './store/room';
    import Loading from './Loading.svelte';
    import Button from "./Button.svelte";
    import {onMount} from "svelte";

    export let room_id = "";

    let joiningRoom = false;
    let name = '';

    $: roomInfoLoading = !($roomStore.id);

    onMount(() => {
        console.log("Fetching room info");
        roomStore.fetchRoomInfo(room_id);
    })

    function joinRoom()
    {
        joiningRoom = true;
        roomStore.join(room_id, name);
    }

    function handleKeyUp(event)
    {
        const submitKeys = ['Enter', 'NumpadEnter']
        if (submitKeys.includes(event.code))
        {
            joinRoom();
        }
    }
</script>

{#if roomInfoLoading || joiningRoom}
    <Loading/>
{:else}
    <input type="text" placeholder="Enter Your Name" bind:value={name} on:keyup={handleKeyUp}><br>
    <Button on:click={joinRoom} value="Join Room" />
{/if}

<style>

</style>