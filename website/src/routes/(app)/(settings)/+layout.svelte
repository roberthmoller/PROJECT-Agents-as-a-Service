<script lang="ts">
    import * as Card from "$components/card";
    import {Button} from "$components/button";
    import {Separator} from "$components/separator";
    import {WorkshopTab} from "$lib/services";
    import {Hammer, User} from "lucide-svelte";
    import TabButton from "../(agent)/(workshop)/tab-button.svelte";
    import {page} from "$app/stores";

    const tabs = [
        {name: "Account", href: "/account", description: "This is how others will see you on the site."},
        {name: "API Keys", href: "/api-keys"},
        // {name: "Billing", href: "/billing"},
    ];

    $: activeTab = tabs.find(tab => tab.href === $page.url.pathname);
</script>


<Card.Root class="h-full border-0">
    <Card.Header>
        <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
        <p class="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
        </p>
        <Separator class="my-4"/>
    </Card.Header>
    <Card.Content>
        <section class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside class="-mx-4 lg:w-1/5">
                <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                    {#each tabs as tab}
                        {@const isActive = $page.url.pathname === tab.href}
                        <Button
                                href={tab.href}
                                variant={isActive? "secondary":"ghost"}
                                class="relative justify-start"
                        >
                            <!--                            <tab.icon class="w-4 mr-2"/>-->
                            {tab.name}
                        </Button>
                    {/each}
                </nav>
            </aside>
            <!--Main-->
            <main class="flex-grow">
                <div class="mb-2">
                    <h3 class="text-lg font-medium">{activeTab.name}</h3>
                    {#if activeTab.description}
                        <p class="text-sm text-muted-foreground">{activeTab.description}</p>
                    {/if}
                </div>
                <Separator/>
                <slot/>
            </main>
        </section>
    </Card.Content>
</Card.Root>
