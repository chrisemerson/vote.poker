<script>
    export let vote = "";
    export let label = "";
    export let onLabelClick = () => {};
</script>

<div class="vote-card">
    <span class="vote">{ vote === '0' ? '' : vote }</span>
    <span class="label" on:click={onLabelClick()}><span>{ label }</span></span>
    <slot />
</div>

<style>
    .vote-card {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        height: 200px;
        width: 150px;
        padding: 10px;
        border-radius: 10px;
        margin: 0 10px;
    }

    .vote {
        font-size: 5em;
        margin-top: .2em;
        font-weight: bold;
    }

    .label {
        margin-top: auto;
        height: 20px;
    }
</style>
