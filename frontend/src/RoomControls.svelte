<script>
    import roomstore from './store/room';
    import socket from './socket';
    import Button from "./Button.svelte";

    let disable_buttons = false;

    socket.addEventListener('message', function (event) {
        const message = JSON.parse(event.data);

        if ((message.action === 'roomsettingschanged' && message.data.votes_revealed === true) || message.action === 'votesreset') {
            disable_buttons = false;
        }
    });

    function resetVotes() {
        disable_buttons = true;
        roomstore.resetVotes();
    }

    function revealVotes() {
        disable_buttons = true;
        roomstore.revealVotes();
    }
</script>

{#if $roomstore.votes_revealed}
    <Button on:click={resetVotes} bind:disabled={disable_buttons} value="Reset Votes" />
{:else}
    <Button on:click={revealVotes} bind:disabled={disable_buttons} value="Reveal Votes" />
{/if}
