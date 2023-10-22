<script>
    import roomStore from './store/room';
    import Button from "./Button.svelte";

    $: disable_buttons = $roomStore.controlsFrozen;

    function resetVotes() {
        roomStore.resetVotes();
    }

    function revealVotes() {
        roomStore.revealVotes();
    }
</script>

{#if $roomStore.votes_revealed}
    <Button on:click={resetVotes} disabled={disable_buttons} value="Reset Votes" />
{:else}
    <Button on:click={revealVotes} disabled={disable_buttons} value="Reveal Votes" />
{/if}
