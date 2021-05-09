<script>
    import roomstore from './store/room';
    import Loading from './Loading.svelte';

    let loading = false;
    let name = '';

    function createRoom()
    {
        loading = true;
        roomstore.create(name);
    }
</script>

<main>
    <div>
        <p>The room you tried to join doesn't exist</p>
    </div>
</main>

<style>
    div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #ffdddd;
        box-shadow: 0 0 10px #333;
    }

    p {
        color: #cc0000;
        font-weight: bold;
    }

</style>