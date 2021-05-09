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
</script>

<main>
    {#if loading}
    <Loading/>
    {:else}
    <input type="text" placeholder="Enter Your Name" bind:value={name}><br>
    <button on:click={createRoom}>Create New Room</button>
    {/if}
</main>

<style>

</style>