<script>
    import roomstore from "./store/room";
</script>

<h2 title="Click to copy" on:click={ navigator.clipboard.writeText("https://vote.poker/?" + $roomstore.id) }>
    https://vote.poker/?{ $roomstore.id }
</h2>

<style>
    h2:hover {
        cursor: pointer;
        color: #3366ff;
    }

    @media (prefers-color-scheme: dark) {
        h2:hover {
            color: #99ccff;
        }
    }
</style>
