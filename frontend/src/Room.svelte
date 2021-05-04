<script>
    import votersstore from './store/voters';
    import roomstore from './store/room';

    import RoomLink from "./RoomLink.svelte";
    import Voter from "./Voter.svelte";
    import VotingOptions from "./VotingOptions.svelte";
    import RoomControls from "./RoomControls.svelte";
</script>

<main>
    <RoomLink />

{#if $votersstore.us === $roomstore.owner}
    <RoomControls />
{/if}

    <div id="voters">
{#each $votersstore.voters.filter((v) => v.voter_id === $votersstore.us) as voter}
        <Voter id={voter.voter_id} />
{/each}
{#each $votersstore.voters.filter((v) => v.voter_id !== $votersstore.us) as voter}
        <Voter id={voter.voter_id} />
{/each}
    </div>

    <VotingOptions />
</main>

<style>
    #voters {
        display: flex;
        flex-direction: row;
    }

</style>
