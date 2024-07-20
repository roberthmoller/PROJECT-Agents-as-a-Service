<script lang="ts">
    import {Button} from "$components/button";
    import {onMount} from "svelte";
    import {Computer, Hammer, User, CheckCircle} from "lucide-svelte";
    import {workshopStore, WorkshopTab} from "$lib/services/workshop-service";
    import {page} from "$app/stores";
    import {Icon} from "svelte-radix";
    import TabButton from "./tab-button.svelte";
    import {Separator} from "$components/separator";
    import * as Card from "$components/card";

    $: state = $workshopStore
    $: tabStore = state.tabStore
    $: tab = $tabStore

    const pages = [
        {name: "Skills", href: "/skills", icon: Hammer},
        {name: "Agents", href: "/agents", icon: User},
    ]
</script>

<Card.Root class="h-full border-0">
<!--    <Card.Header>-->
<!--        <h2 class="text-2xl font-bold tracking-tight">Workshop</h2>-->
<!--&lt;!&ndash;        <p class="text-muted-foreground">&ndash;&gt;-->
<!--&lt;!&ndash;            Manage your account settings and set e-mail preferences.&ndash;&gt;-->
<!--&lt;!&ndash;        </p>&ndash;&gt;-->
<!--        <Separator class="my-4"/>-->
<!--    </Card.Header>-->
    <Card.Content>
        <section class="pt-4 flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside class="-mx-4 lg:w-1/5">
                <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                    <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Build</h2>
                    <div class="space-y-1">
                        {#each pages as p}
                            {@const isActive = $page.url.pathname === p.href}
                            <TabButton {isActive} href={p.href}>
                                <Icon icon={p.icon} class="w-4 mr-2"/>
                                {p.name}
                            </TabButton>
                        {/each}
                    </div>
                </nav>
            </aside>
            <main class="flex-grow">
                <!--    <main class="h-full w-full px-4 py-6 lg:px-8">-->
                <slot/>
            </main>
        </section>
    </Card.Content>
</Card.Root>

