<script>
import {Reload} from "radix-icons-svelte";
</script>

<div class="flex h-[450px] shrink-0 items-center justify-center">
    <div
            class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center"
    >
        <p class="text-lg font-semibold">
            <Reload class="mr-2 h-4 w-4 animate-spin"/>
            Loading agents
        </p>
        <p class="mb-4 mt-2 text-sm text-muted-foreground">
            Please wait while we load your agents.
        </p>
    </div>
</div>