<script>
    import roomstore from './store/room';
    import Loading from './Loading.svelte';
    import Button from "./Button.svelte";

    export let room_id = "";

    let loading = false;
    let name = '';

    function joinRoom()
    {
        loading = true;
        roomstore.join(room_id, name);
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

{#if loading}
    <Loading/>
{:else}
    <input type="text" placeholder="Enter Your Name" bind:value={name} on:keyup={handleKeyUp}><br>
    <Button on:click={joinRoom} value="Join Room" />
{/if}

<style>

</style>