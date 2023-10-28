<script>
    export let value = '';
    export let disabled = false;
</script>

<button on:click bind:disabled={disabled}>{value}</button>

<style>
    button {
        background: #ffffff;
        color: #333333;
        border: 1px solid #333333;
        border-radius: 5px;
        padding: 10px 15px;
        cursor: pointer;
    }

    button:hover {
        background: #eeeeee;
        color: #000000;
        border-color: #000000;
    }

    @media (prefers-color-scheme: dark) {
        button {
            background: #2c2c2c;
            color: #cccccc;
            border: 1px solid #cccccc;
        }

        button:hover {
            background: #3c3c3c;
            color: #ffffff;
            border-color: #ffffff;
        }
    }

</style>