<script>
    import roomstore from './store/room';
    import Loading from './Loading.svelte';

    export let room_id = "";

    let loading = false;
    let name = '';

    function joinRoom()
    {
        loading = true;
        roomstore.join(room_id, name);
    }
</script>

{#if loading}
    <Loading/>
{:else}
    <input type="text" placeholder="Enter Your Name" bind:value={name}><br>
    <button on:click={joinRoom}>Join Room</button>
{/if}

<style>

</style>