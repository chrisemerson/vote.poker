<script>
    import votersstore from './store/voters';
    import roomstore from './store/room';

    import RoomLink from "./RoomLink.svelte";
    import Voter from "./Voter.svelte";
    import VotingOptions from "./VotingOptions.svelte";
    import RoomControls from "./RoomControls.svelte";
    import VoteSummary from "./VoteSummary.svelte";
</script>

<RoomLink />

{#if $votersstore.us === $roomstore.owner}
    <RoomControls />
{/if}

<div id="voters">
    {#each $votersstore.voters as voter}
        <Voter id={voter.voter_id} />
    {/each}
</div>

<VoteSummary />

<VotingOptions />

<style>
    #voters {
        display: flex;
        flex-direction: row;
    }

</style>
