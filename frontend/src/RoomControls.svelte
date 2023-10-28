<script>
    import roomStore from './store/room';
    import Button from "./Button.svelte";

    $: disableButtons = $roomStore.controlsFrozen;

    function resetVotes() {
        roomStore.resetVotes();
    }

    function revealVotes() {
        roomStore.revealVotes();
    }
</script>

{#if $roomStore.votes_revealed}
    <Button on:click={resetVotes} bind:disabled={disableButtons} value="Reset Votes" />
{:else}
    <Button on:click={revealVotes} bind:disabled={disableButtons} value="Reveal Votes" />
{/if}
