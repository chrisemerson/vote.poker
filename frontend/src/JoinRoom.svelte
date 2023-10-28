<script>
    import roomstore from './store/room';
    import Loading from './Loading.svelte';
    import Button from "./Button.svelte";

    export let room_id = "";

    let loading = false;
    let name = '';
    let observer = false;

    function joinRoom()
    {
        loading = true;
        roomstore.join(room_id, name, observer);
    }

    function handleKeyUp(event)
    {
        const submitKeys = ['Enter', 'NumpadEnter']
        if (submitKeys.includes(event.code))
        {
            joinRoom();
        }
    }
</script>

{#if loading}
    <Loading/>
{:else}
    <input type="text" placeholder="Enter Your Name" bind:value={name} on:keyup={handleKeyUp}><br>

    <label>
        <input type="checkbox" name="observer" value="true" bind:checked={observer}> Observer
    </label>

    <div class="buttons">
        <Button on:click={joinRoom} value="Join Room" />
    </div>
{/if}

<style>
    input[type=text] {
        width: 20%;
    }

    label {
        display: block;
        width: 20%;
        margin: 0 auto;
        text-align: left;
        cursor: pointer;
    }

    input[type=checkbox] {
        appearance: none;
        user-select: none;
        cursor: pointer;
        background-color: #333333;
        width: 1.5em;
        height: 1.5em;
        margin-right: 1em;
        margin-bottom: -.4em;
        margin-top: 1em;
        position: relative;
    }

    input[type=checkbox]:checked {
        background-color: #111111;
    }

    input[type=checkbox]:checked:before, input[type=checkbox]:checked:after {
        content: "";
        position: absolute;
        border: 3px none #ffffff;
        display: block;
    }

    input[type=checkbox]:checked:before {
        height: .9em;
        border-right-style: solid;
        transform: rotate(40deg);
        bottom: .225em;
        left: .74em;
    }

    input[type=checkbox]:checked:after {
        width: .4em;
        border-bottom-style: solid;
        transform: rotate(50deg);
        bottom: .425em;
        left: .29em;
    }

    .buttons {
        margin-top: 2em;
    }
</style>