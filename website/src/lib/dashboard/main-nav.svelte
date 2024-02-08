<script lang="ts">
    import {cn} from "$lib/utils";
    import {page} from "$app/stores";

    let className: string | undefined | null = undefined;
    export {className as class};

</script>

<nav class={cn("flex items-center space-x-4 lg:space-x-6", className)}>
    <a
            href="/home"
            class="text-sm font-medium transition-colors hover:text-primary"
            class:active={$page.url.pathname === "/home"}
            class:text-muted-foreground={$page.url.pathname !== "/home"}

    >
        Home
    </a>

    <a
            href="/chat"
            class="text-sm font-medium transition-colors hover:text-primary"
            class:avtive={$page.url.pathname === "/chat"}
            class:text-muted-foreground={$page.url.pathname !== "/chat"}
    >
        Chat
    </a>
</nav>