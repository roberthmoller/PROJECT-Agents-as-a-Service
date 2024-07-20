<script lang="ts">
    import {cn} from "$components/utils";
    import type {HTMLAttributes} from "svelte/elements";
    import {hotkey as hk} from "svelte-gh-hotkey";

    type $$Props = HTMLAttributes<HTMLSpanElement>;

    let className: $$Props["class"] = undefined;
    export {className as class};
    export let hotkey: string | undefined = undefined;
</script>

<span class={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...$$restProps} use:hk={hotkey}>
	<slot/>
</span>
