<script lang="ts">
    import CreateSkillCard from "./skills/create-skill-card.svelte";
    import SkillCard from "./skills/skill-card.svelte";
    import {workshopStore} from "$lib/services";

    $: ({skillsStore} = $workshopStore);
    $: skills = $skillsStore;

</script>

<h2 class="text-2xl font-semibold mb-2">Skills</h2>
<!--{#if agents.isLoaded ?? true }-->
<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <CreateSkillCard/>
    {#each skills.value as skill}
        <SkillCard {skill}/>
    {/each}

</div>
<!--{:else if agents.error}-->
<!--    <div class="flex h-[450px] shrink-0 items-center justify-center">-->
<!--        <div class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">-->
<!--            <p class="text-lg font-semibold">Failed to load agents</p>-->
<!--            <p class="mb-4 mt-2 text-sm text-muted-foreground">-->
<!--                There was an error loading agents. Please try again.-->
<!--            </p>-->
<!--            <Button variant="outline" on:click={refreshAgents}>Try Again</Button>-->
<!--        </div>-->
<!--    </div>-->
<!--{:else}-->
<!--    <AgentLoader/>-->
<!--{/if}-->