<script lang="ts">
    import {cn} from "$components/utils";
    import {page} from "$app/stores";
    import {hotkey} from "svelte-gh-hotkey";
    import TabButton from "./(agent)/(workshop)/tab-button.svelte";

    const pages = [
        {href: "/chat", name: "Chat"},
        {href: "/skills", name: "Workshop", children: ["/agents", "/skills", "/tasks", "/workflows"]},
    ];

    let shouldShowShortcuts = false;

    function showShortcuts() {
        shouldShowShortcuts = !shouldShowShortcuts;
    }
</script>


<span on:click={showShortcuts} use:hotkey={'Shift+?'}></span>
<nav class="flex items-center">
    {#each pages as p, index}
        {@const active = $page.url.pathname === p.href || p.children?.includes($page.url.pathname)}
        <TabButton
                href={p.href}
                class="text-sm font-medium transition-colors hover:text-primary"
                variant="link"
                hotkey={'Meta+Shift+'+ (index+1)}
                isActive={active}
        >
            {#if shouldShowShortcuts}
                <span class="text-sm text-muted-foreground ml-1">[{index + 1}]</span>
            {/if}
            {p.name}
        </TabButton>
    {/each}
</nav>