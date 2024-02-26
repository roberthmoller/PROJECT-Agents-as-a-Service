<script lang="ts">
    import {Button} from "$components/button";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    export let isActive: boolean, href: string | undefined,
        variant: "secondary" | "ghost" | "primary" | "link" = "link";

</script>

<Button class="w-full justify-start"
        variant={isActive ? "secondary": variant}
        on:click={() => dispatch("click")}
        {href}
>
    <slot/>
</Button>