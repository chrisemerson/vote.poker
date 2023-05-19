<script>
    import votersstore from "./store/voters";
    import roomstore from "./store/room";
    import Button from "./Button.svelte";

    export let id = null;

    let name = "";
    let new_name = "";
    let vote;
    let hasVoted;
    let changingName = false;
    let isUs;

    $: {
        const thisVoter = $votersstore.voters.filter((v) => v.voter_id === id)[0];
        isUs = id === $votersstore.us;

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

<div
    class:voter={true}
    class:voted={ hasVoted && !$roomstore.votes_revealed }
    class:us={ isUs }
    class:changing-name={ changingName }
>
    <span class="vote">{ vote === "0" ? '' : vote }</span>
    <div class="change-name">
        <input type="text" size="10" bind:value="{new_name}"/>
        <Button on:click={submitNameChange} value="Change Name" />
        <span class="name us">(You)</span>
    </div>
    <span class="name">
        <span on:click={isUs ? changeName : () => {}}>{ name }</span>
    </span>
</div>

<style>
    .voter {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        height: 200px;
        width: 150px;
        padding: 10px;
        border-radius: 10px;
        margin: 0 10px;
        order: 2;
    }

    .voter.us {
        order: 1;
    }

    .vote {
        font-size: 5em;
        margin-top: .2em;
        font-weight: bold;
    }

    .name {
        margin-top: auto;
        height: 20px;
    }

    .voter.us .name {
      font-weight: bold;
    }

    .voter.us .name:after {
        display: inline;
        content: " (You)";
    }

    .voter .change-name {
        display: none;
    }

    .voter.us.changing-name .change-name {
        display: block;
    }

    .voter.us.changing-name .name {
        display: none;
    }

    .voter.us .name span {
      color: rgb(0,100,200);
      cursor: pointer;
    }

    .voter.us .name span:hover {
      text-decoration: underline;
    }

    .voter.voted {
        background: #ccddff;
    }

    @media (prefers-color-scheme: dark) {
        .voter.us .name span {
            color: rgb(100, 200, 255);
        }

        .voter.voted {
            background-color: #223355;
        }
    }
</style>
