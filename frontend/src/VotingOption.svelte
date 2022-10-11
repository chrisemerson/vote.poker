<script>
    import votersstore from "./store/voters";
    import roomstore from "./store/room";

    export let value = 0;
    $: selected = $votersstore.my_vote === value;

    function placeVote(value) {
        if (!$roomstore.votes_revealed) {
            if (selected) {
                votersstore.placeVote("");
            } else {
                votersstore.placeVote(value);
            }
        }
    }
</script>

<div class="voting-option">
    <div class="card { (selected ? 'selected' : '') + ' ' + (!$roomstore.votes_revealed ? 'selectable' : '')}" on:click={ () => placeVote(value) }>
        { value }
    </div>
</div>


<style>
    .voting-option {
        height: 150px;
        display: flex;
        margin-top: 60px;
    }
    
    .card {
        border: 1px solid black;
        height: 100px;
        width: 100px;
        max-width: 100px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 10px;
        margin: 0 3px -1px 3px;
        font-size: 4em;
        font-weight: bold;
        flex: 10%;
        align-self: flex-end;
    }

    div.selectable:hover {
        cursor: pointer;
    }

    div.selectable:hover, div.selected {
        background: #3366ff;
        color: white;
        height: 150px;
    }
</style>
