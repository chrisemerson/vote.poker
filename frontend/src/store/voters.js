import { readable } from 'svelte/store';

export const voters = readable([
    {
        id: "",
        name: "",
        current_vote: ""
    }
]);
