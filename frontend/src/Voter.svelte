<script>
    import votersstore from "./store/voters";
    import roomstore from "./store/room";
    import Button from "./Button.svelte";
    import VoteCard from "./VoteCard.svelte";

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
    <VoteCard vote="{vote}" label="{name}" onLabelClick={ isUs ? changeName : () => {} }>
        <div class="change-name">
            <input type="text" size="10" bind:value="{new_name}"/>
            <Button on:click={submitNameChange} value="Change Name" />
            <span class="name us">(You)</span>
        </div>
    </VoteCard>
</div>

<style>
    .voter {
        order: 2;
    }

    .voter.us {
        order: 1;
    }

    .voter.us :global(.label) {
      font-weight: bold;
    }

    .voter.us :global(.label:after) {
        display: inline;
        content: " (You)";
    }

    .voter.us :global(.label span) {
        color: rgb(0,100,200);
        cursor: pointer;
    }

    .voter .change-name {
        display: none;
    }

    .voter.us.changing-name .change-name {
        display: block;
    }

    .voter.us.changing-name :global(.label) {
        display: none;
    }

    .voter.us .name span:hover {
      text-decoration: underline;
    }

    .voter.voted :global(.vote-card) {
        background: #ccddff;
    }

    @media (prefers-color-scheme: dark) {
        .voter.us :global(.label:after span) {
            color: rgb(100, 200, 255);
        }

        .voter.voted :global(.vote-card) {
            background-color: #223355;
        }
    }
</style>
