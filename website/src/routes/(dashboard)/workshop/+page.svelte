<script lang="ts">
    import {Button} from "$lib/components/ui/button";
    import {Users} from "lucide-svelte";
    import {onMount} from "svelte";
    import {Computer, Hammer, CheckCircle} from "lucide-svelte";
    import {activeTab, workshopStore, WorkshopTab} from "$lib/services/workshop-service";
    import {AgentsTab, SkillsTab, TasksTab, TabButton} from './tabs';

    $: ({tabStore} = $workshopStore)
    $: tab = $tabStore

</script>
<div class="flex">
    <!--Sidebar-->
    <div class="pb-12">
        <div class="space-y-4 py-4">
            <div class="px-3 py-2">
                <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Build</h2>
                <div class="space-y-1">
                    <TabButton isActive={tab === WorkshopTab.AGENTS} on:click={() => tabStore.set(WorkshopTab.AGENTS)}>
                        <Computer class="w-4 mr-2"/>
                        Agents
                    </TabButton>
                    <TabButton isActive={tab === WorkshopTab.SKILLS} on:click={() => tabStore.set(WorkshopTab.SKILLS)}>
                        <Hammer class="w-4 mr-2"/>
                        Skills
                    </TabButton>
                    <TabButton isActive={tab === WorkshopTab.TASKS} on:click={() => tabStore.set(WorkshopTab.TASKS)}>
                        <CheckCircle class="w-4 mr-2"/>
                        Tasks
                    </TabButton>
                </div>
            </div>
            <div class="space-y-4 py-4">
                <div class="px-3 py-2">
                    <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Compose</h2>
                    <div class="space-y-1">
                        <Button variant="ghost" class="w-full justify-start">
                            <Users class="w-4 mr-2"/>
                            Workflows
                        </Button>
                        <Button variant="ghost" class="w-full justify-start">
                            <Users class="w-4 mr-2"/>
                            Teams
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Main-->
    <div class="h-full w-full px-4 py-6 lg:px-8">
        {#if tab === WorkshopTab.AGENTS}
            <AgentsTab/>
        {:else if tab === WorkshopTab.SKILLS}
            <SkillsTab/>
        {:else if tab === WorkshopTab.TASKS}
            <TasksTab/>
        {/if}
    </div>
</div>