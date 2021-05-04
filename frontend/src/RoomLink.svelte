<script>
    import roomstore from "./store/room";
</script>

<main>
    <h2 title="Click to copy" on:click={ navigator.clipboard.writeText("https://bjss.poker/?" + $roomstore.id) }>
        https://bjss.poker/?{ $roomstore.id }
    </h2>
</main>

<style>
    h2:hover {
        cursor: pointer;
        color: #3366ff;
    }
</style>
