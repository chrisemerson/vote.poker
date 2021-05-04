<script>
    import roomstore from './store/room';
</script>

<main>
{#if $roomstore.votes_revealed}
    <button on:click={roomstore.resetVotes}>Reset Votes</button>
{:else}
    <button on:click={roomstore.revealVotes}>Reveal Votes</button>
{/if}
</main>

<style>

</style>