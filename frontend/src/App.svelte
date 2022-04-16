<script>
    import roomstore from "./store/room";
    import socket from "./socket";

    import Room from "./Room.svelte";
    import NoRoom from "./NoRoom.svelte";
    import JoinRoom from "./JoinRoom.svelte";
    import Loading from "./Loading.svelte";
    import RoomDoesntExist from "./RoomDoesntExist.svelte";
    import RedirectMessage from "./RedirectMessage.svelte";

    $: in_room = !!($roomstore.id && $roomstore.id !== "");

    let connected = false;
    let joiningroom = false;
    let joiningroom_id = "";
    let room_doesnt_exist_message = false;
    let redirect_message = false;

    if (window.location.search !== "") {
        joiningroom_id = window.location.search.substring(1);

        if (joiningroom_id === "redirect") {
            redirect_message = true;
        } else if (joiningroom_id === "roomdoesntexist") {
            room_doesnt_exist_message = true;
        } else {
            joiningroom = true;
        }
    }

    socket.addEventListener('open', () => connected = true);

    socket.addEventListener('message', function (event) {
        const message = JSON.parse(event.data);

        if (message.action === "roomdoesntexist") {
            window.location.href = '/?roomdoesntexist';
        }
    });
</script>

<main>
    <h1>VOTE.POKER</h1>
{#if !connected}
    <Loading/>
{:else if in_room }
    <Room/>
{:else if joiningroom}
    <JoinRoom room_id={joiningroom_id}/>
{:else}
    {#if redirect_message}
        <RedirectMessage/>
    {:else if room_doesnt_exist_message}
        <RoomDoesntExist/>
    {/if}
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
