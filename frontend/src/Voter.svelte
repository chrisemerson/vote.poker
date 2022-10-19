<script>
    import votersstore from "./store/voters";
    import roomstore from "./store/room";

    export let id = null;

    let name = "";
    let new_name = "";
    let vote = "";
    let hasVoted;
    let changingName = false;

    $: {
        const thisVoter = $votersstore.voters.filter((v) => v.voter_id === id)[0];

        if ($roomstore.votes_revealed && thisVoter.vote) {
            vote = thisVoter.vote;
        } else {
            vote = "";
        }

        if (thisVoter.voter_name) {
            name = thisVoter.voter_name;
        }

        hasVoted = thisVoter.vote_placed;
    }

    function changeName () {
        new_name = name;
        changingName = true;
    }

    function submitNameChange () {
        votersstore.changeName(new_name);
        changingName = false;
    }
</script>

<div class="{ hasVoted && !$roomstore.votes_revealed ? 'voted' : ''}">
    <span class="vote">{ vote === "0" ? '' : vote }</span>
    {#if id === $votersstore.us}
        {#if changingName}
            <input type="text" size="10" bind:value="{new_name}"/>
            <button on:click={submitNameChange}>Change Name</button>
            <span class="name us">(You)</span>
        {:else}
            <span class="name us"><span class="changename" on:click={changeName}>{ name }</span> (You)</span>
        {/if}
    {:else}
        <span class="name">{ name }</span>
    {/if}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        height: 200px;
        width: 150px;
        padding: 10px;
        border-radius: 10px;
        margin: 0 10px;
    }

    div .vote {
        font-size: 5em;
        margin-top: .2em;
        font-weight: bold;
    }

    div .name {
        margin-top: auto;
        height: 20px;
    }

    div .name.us {
      font-weight: bold;
    }

    div .name.us .changename {
      color: rgb(0,100,200);
      cursor: pointer;
    }

    div .name.us .changename:hover {
      text-decoration: underline;
    }

    div.voted {
        background: #ccddff;
    }
</style>
