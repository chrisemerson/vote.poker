<script>
    import votersStore from './store/voters';
    import roomStore from './store/room';

    import RoomLink from "./RoomLink.svelte";
    import Voter from "./Voter.svelte";
    import VotingOptions from "./VotingOptions.svelte";
    import RoomControls from "./RoomControls.svelte";

    $: observers = [
        ...$votersStore.voters.filter(v => v.settings.observer && v.voter_id === $votersStore.us),
        ...$votersStore.voters.filter(v => v.settings.observer && v.voter_id !== $votersStore.us)
    ];
</script>

<RoomLink />

{#if $votersStore.us === $roomStore.owner}
    <RoomControls />
{/if}

<div id="observers">
    <p><strong>Observers:</strong> {observers.map(v => v.voter_name.trim()).join(", ")}</p>
</div>

<div id="voters">
{#each $votersStore.voters.filter(v => !v.settings.observer && v.voter_id === $votersStore.us) as voter}
    <Voter id={voter.voter_id} />
{/each}
{#each $votersStore.voters.filter(v => !v.settings.observer && v.voter_id !== $votersStore.us) as voter}
    <Voter id={voter.voter_id} />
{/each}
</div>

{#if $votersStore.voters.filter(v => v.voter_id === $votersStore.us).length > 0
&& !$votersStore.voters.filter(v => v.voter_id === $votersStore.us)[0].settings.observer}
<VotingOptions />
{/if}

<style>
    #observers {
        width: 100%;
        text-align: left;
    }

    #voters {
        display: flex;
        flex-direction: row;
    }

</style>
