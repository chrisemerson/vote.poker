<script>
    import VotingOption from "./VotingOption.svelte";

</script>

<VotingOption value="1"/>
<VotingOption value="2"/>
<VotingOption value="3"/>
<VotingOption value="5"/>
<VotingOption value="8"/>
<VotingOption value="13"/>
<VotingOption value="21"/>
<VotingOption value="34"/>
<VotingOption value="55"/>
<VotingOption value="89"/>
<VotingOption value="?"/>

<style>
    main {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        height: 400px;
        border-bottom: 1px solid black;
    }
</style>
