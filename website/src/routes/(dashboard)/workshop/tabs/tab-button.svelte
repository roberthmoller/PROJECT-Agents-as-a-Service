<script lang="ts">
    import {Button} from "$lib/components/ui/button/index.js";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    export let isActive: boolean;

</script>

<Button class="w-full justify-start"
        variant={isActive ? "secondary": "ghost"}
        on:click={() => dispatch("click")}>
    <slot/>
</Button>