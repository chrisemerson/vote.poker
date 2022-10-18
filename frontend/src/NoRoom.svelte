<script>
    import roomstore from './store/room';
    import Loading from './Loading.svelte';

    let loading = false;
    let name = '';

    function createRoom()
    {
        loading = true;
        roomstore.create(name);
    }

    function handleKeyUp(event)
    {
        const submitKeys = ['Enter', 'NumpadEnter']
        if (submitKeys.includes(event.code))
        {
            createRoom();
        }
    }
</script>

{#if loading}
    <Loading/>
{:else}
    <input type="text" placeholder="Enter Your Name" bind:value={name} on:keyup={handleKeyUp}><br>
    <button on:click={createRoom}>Create New Room</button>
{/if}

<style>

</style>