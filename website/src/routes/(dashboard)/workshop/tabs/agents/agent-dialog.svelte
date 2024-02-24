<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import * as Tabs from "$lib/components/ui/tabs";
    import {Button} from "$lib/components/ui/button";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
    import {AgentSpecification, SavedAgentSpecification} from "api-client";
    import {agentApi} from "$lib/api";
    import {toast} from "svelte-sonner";
    import {workshopStore} from "$lib/services";
    import {Textarea} from "$lib/components/ui/textarea";
    import {HelpCircle} from 'lucide-svelte';
    import {Checkbox} from "$lib/components/ui/checkbox";

    export let agent: SavedAgentSpecification | AgentSpecification = new AgentSpecification();

    let agentName = agent.name ?? "";
    let agentInstructions = agent.systemMessage ?? "";
    let agentDescription = agent.description ?? "";
    let agentSkills: string[] = agent.skills ?? [];
    let open = false;

    $: state = $workshopStore;
    $: skillsStore = state.skillsStore;
    $: skills = $skillsStore;
    $: isMissingName = agentName?.trim().length === 0;
    $: isMissingInstructions = agentInstructions?.trim().length === 0;
    $: hasErrors = isMissingName || isMissingInstructions;

    const saveAgent = async () => {
        if (hasErrors) return;
        agent.name = agentName;
        agent.description = agentDescription;
        agent.systemMessage = agentInstructions;
        agent.skills = agentSkills;
        await state.saveAgent(agent);
        open = false;
    }
    const toggleSkill = (skillId: String) => {
        if (agentSkills.includes(skillId)) {
            agentSkills = agentSkills.filter(id => skillId !== id);
        } else {
            agentSkills = [...agentSkills, skillId];
        }
        // skills = skills;
    }
</script>

<Dialog.Root bind:open={open}>
    <Dialog.Trigger asChild let:builder>
        {#if agent instanceof SavedAgentSpecification}
            <Button size="sm" builders={[builder]} class="relative">Edit</Button>
        {:else}
            <Button size="sm" builders={[builder]} class="relative">Create</Button>
        {/if}
    </Dialog.Trigger>


    <Dialog.Content class="md:min-w-[40rem] md:h-[50rem] flex flex-col">
        <Dialog.Header>
            {#if agent instanceof SavedAgentSpecification}
                <Dialog.Title>Edit {agent.name}</Dialog.Title>
                <Dialog.Description>Redefine the agent and its capabilities.</Dialog.Description>
            {:else}
                <Dialog.Title>Create a new agent</Dialog.Title>
                <Dialog.Description>Define the agent and its capabilities.</Dialog.Description>
            {/if}
        </Dialog.Header>
        <div class="flex-grow">
            <Tabs.Root >
                <Tabs.List class="grid w-full grid-cols-2">
                    <Tabs.Trigger value="details">Details<span class="text-red-700">*</span></Tabs.Trigger>
                    <Tabs.Trigger value="skills">Capabilities</Tabs.Trigger>
                </Tabs.List>

                <form on:submit|preventDefault={saveAgent}>
                    <Tabs.Content value="details">
                        <div class="flex flex-col space-y-4 py-4 h-full">
                            <div class="grid gap-2">
                                <Label for="url">Name<span class="text-red-700">*</span></Label>
                                <Input
                                        id="name"
                                        placeholder="Pirate Paul"
                                        type="name"
                                        autocapitalize="words"
                                        autocorrect="off"
                                        required
                                        bind:value={agentName}
                                />
                            </div>
                            <div class="grid gap-2">
                                <Label for="url">Description</Label>
                                <span class="text-muted-foreground text-sm">A short description of the agent for you to identify it later.</span>
                                <Input
                                        id="Description"
                                        placeholder="A pirate that has been at sea for 20 years."
                                        autocorrect="on"
                                        bind:value={agentDescription}
                                />
                            </div>
                            <div class="flex flex-col gap-2 flex-grow">
                                <Label for="url">Instructions<span class="text-red-700">*</span></Label>
                                <span class="text-muted-foreground text-sm">
                                 What tasks the agent should complete and how, its scope or limitations, and its tone.
                                    <a class="text-sm text-blue-400" target="_blank"
                                       href="https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/system-message">
                                            <HelpCircle class="w-4 h-4 inline-block"/>
                                    </a>
                                </span>
                                <Textarea
                                        id="instructions"
                                        placeholder="You are a pirate called Paul and you talk like a pirate that has been at sea for 20 years."
                                        autocorrect="on"
                                        required
                                        class="h-[22rem]"
                                        bind:value={agentInstructions}
                                />
                            </div>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="skills">
                        <div class="grid gap-4 py-4">
                            <div class="grid gap-2">
                                <Label for="url">Skills</Label>
                                <span class="text-muted-foreground text-sm">The skills the agent has and can use to complete tasks.</span>
                                {#each skills.value as skill}
                                    {@const isSelected = agentSkills.includes(skill.id)}
                                    <Button variant="ghost"
                                            on:click={() => toggleSkill(skill.id)}>
                                        <div class="flex space-x-2 items-start justify-items-start w-full"
                                             class:items-top={skill.description}
                                             class:items-center={!skill.description}>
                                            <Checkbox id={skill.id} checked={isSelected}/>
                                            <div class="flex flex-col flex-grow items-start">
                                                <p class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    {skill.name}
                                                </p>
                                                {#if skill.description}
                                                    <p class="text-sm text-muted-foreground">
                                                        {skill.description}
                                                    </p>
                                                {/if}
                                            </div>
                                        </div>
                                    </Button>
                                {/each}
                            </div>
                        </div>
                    </Tabs.Content>
                </form>
            </Tabs.Root>
        </div>
        <Dialog.Footer>
            {#if agent instanceof SavedAgentSpecification}
                <Button on:click={saveAgent} disabled={hasErrors}>Save</Button>
            {:else}
                <Button on:click={saveAgent} disabled={hasErrors}>Create</Button>
            {/if}
            <Button on:click={() => open = false} variant="ghost">Cancel</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>