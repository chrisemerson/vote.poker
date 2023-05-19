<script>
    import votersstore from "./store/voters";
    import roomstore from "./store/room";
    import VoteCard from "./VoteCard.svelte";

    let min, most, max;

    $: {
        if ($roomstore.votes_revealed) {
            const votes = $votersstore.voters.map(v => parseInt(v.vote)).filter(v => v > 0);

            min = Math.min(...votes);
            max = Math.max(...votes);

            const distribution = Object.entries(
                votes.reduce(
                    (dist, score) => {
                        dist[score] = (dist[score] || 0) + 1;
                        return dist;
                    },
                    {}
                )
            );

            const maxVotes = Math.max(...(distribution.map(([, votes]) => typeof votes === 'number' ? votes : 0)));

            most = distribution.filter(([,votes]) => votes === maxVotes).map(([score]) => score).join(',');
        } else {
            min = "";
            most = "";
            max = "";
        }
    }
</script>

<h3>Summary</h3>
<div class="vote-summary">
    <VoteCard vote="{min}" label="Minimum" />
    <VoteCard vote="{most}" label="Most votes" />
    <VoteCard vote="{max}" label="Maximum" />
</div>

<style>
    h3 {

    }
    .vote-summary {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>
