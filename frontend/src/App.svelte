<script>
    import roomstore from "./store/room";
    import socket from "./socket";

    import Room from "./Room.svelte";
    import NoRoom from "./NoRoom.svelte";
    import JoinRoom from "./JoinRoom.svelte";
    import Loading from "./Loading.svelte";

    $: in_room = !!($roomstore.id && $roomstore.id !== "");

    let connected = false;
    let joiningroom = false;
    let joiningroom_id = "";

    if (window.location.search !== "") {
        joiningroom = true;
        joiningroom_id = window.location.search.substring(1);
    }

    socket.addEventListener('open', () => connected = true);
</script>

<main>
    <h1>BJSS.POKER</h1>
{#if !connected}
    <Loading/>
{:else if in_room }
    <Room/>
{:else if joiningroom}
    <JoinRoom room_id={joiningroom_id}/>
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
