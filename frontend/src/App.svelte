<script>
    import Room from "./Room.svelte";
    import NoRoom from "./NoRoom.svelte";

    const in_room = true;
</script>

<main>
    <h1>Planning Poker</h1>

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
        color: #ff3e00;
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
