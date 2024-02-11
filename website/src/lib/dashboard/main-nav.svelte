<script lang="ts">
    import {cn} from "$lib/utils";
    import {page} from "$app/stores";

    let className: string | undefined | null = undefined;
    export {className as class};

</script>

<nav class={cn("flex items-center space-x-4 lg:space-x-6", className)}>
    <a
            href="/chat"
            class="text-sm font-medium transition-colors hover:text-primary"
            class:avtive={$page.url.pathname === "/chat"}
            class:text-muted-foreground={$page.url.pathname !== "/chat"}
    >
        Chat
    </a>

    <a
            href="/agents"
            class="text-sm font-medium transition-colors hover:text-primary"
            class:avtive={$page.url.pathname === "/agents"}
            class:text-muted-foreground={$page.url.pathname !== "/agents"}
    >
        Agents
    </a>
</nav>