<script>
    import roomstore from './store/room';
    import socket from './socket';

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
    <button on:click={resetVotes} disabled={disable_buttons}>Reset Votes</button>
{:else}
    <button on:click={revealVotes} disabled={disable_buttons}>Reveal Votes</button>
{/if}
