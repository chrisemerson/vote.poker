<script>
    import roomStore from "./store/room";
    import socket from "./socket";

    import Room from "./Room.svelte";
    import CreateRoom from "./CreateRoom.svelte";
    import JoinRoom from "./JoinRoom.svelte";
    import Loading from "./Loading.svelte";
    import RoomDoesntExist from "./RoomDoesntExist.svelte";

    $: in_room = !!($roomStore.id && $roomStore.id !== "");

    let connected = false;
    let joiningroom = false;
    let joiningroom_id = "";
    let room_doesnt_exist_message = false;

    if (window.location.search !== "") {
        joiningroom_id = window.location.search.substring(1);

        if (joiningroom_id === "roomdoesntexist") {
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
    {#if room_doesnt_exist_message}
        <RoomDoesntExist/>
    {/if}
    <CreateRoom/>
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

     @media (prefers-color-scheme: dark) {
         h1 {
             color: #99ccff;
         }
     }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
