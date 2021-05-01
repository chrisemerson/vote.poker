<script>
    import roomstore from "./store/room";

    import Room from "./Room.svelte";
    import NoRoom from "./NoRoom.svelte";

    let in_room = !!($roomstore.id && $roomstore.id !== "");
</script>

<main>
    <h1>BJSS.POKER</h1>

{#if in_room }
    <Room/>
{:else}
    <NoRoom/>
{/if}
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #3366ff;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
