<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import {Button} from "$lib/components/ui/button";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
    import Editor from "./editor.svelte"
    import {SavedSkillSpecification, SkillSpecification} from "api-client";
    import {workshopStore} from "$lib/services";

    export let skill: SavedSkillSpecification | SkillSpecification = new SkillSpecification();

    $: state = $workshopStore;
    let open = false;

    let skillName = skill.name ?? "";
    let description = skill.description ?? "";
    let requirements = skill.requirements ?? "";
    let code = skill.code ?? "";

    const saveAndClose = async () => {
        skill.name = skillName;
        skill.description = description;
        skill.requirements = requirements;
        skill.code = code;
        await state.saveSkill(skill);
        open = false;
    }

    $: canSave = skillName?.trim().length > 0 && code?.trim().length > 0;
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger asChild let:builder>
        {#if skill instanceof SavedSkillSpecification}
            <Button size="sm" builders={[builder]} class="relative">Edit</Button>
        {:else if skill instanceof SkillSpecification}
            <Button size="sm" builders={[builder]} class="relative">Create</Button>
        {/if}
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[1000px]">
        <Dialog.Header>
            <Dialog.Title>Create a skill</Dialog.Title>
            <Dialog.Description>Define a new skill.</Dialog.Description>
        </Dialog.Header>
        <form on:submit|preventDefault>
            <div class="grid gap-4 py-4">
                <div class="grid gap-2">
                    <Label for="url">Name<span class="text-red-700">*</span></Label>
                    <Input
                            id="name"
                            placeholder="Descriptive title of the skill, e.g. Search for Wikipedia articles."
                            type="text"
                            autocapitalize="words"
                            autocorrect="off"
                            required
                            bind:value={skillName}
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="url">Description</Label>
                    <Input
                            id="description"
                            placeholder="Useful to identify what the skill does. E.g. Takes any search term and returns a list of Wikipedia articles."
                            type="text"
                            autocorrect="on"
                            bind:value={description}
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="url">Requirements</Label>
                    <span class="text-muted-foreground">
                        The contents of your <code>`requirements.txt`</code> or <code>`pip freeze`</code> output.
                    </span>
                    <Editor bind:code={requirements}
                            language="txt"
                            class="flex-grow h-[6rem] justify-stretch flex overflow-y-scroll"/>

                </div>
                <div class=" h-[22rem] flex space-y-2 flex-col">
                    <Label for="code">Code<span class="text-red-700">*</span></Label>
                    <span class="text-muted-foreground">
                        Each method will be used as a skill and any annotations and docstrings will be used as the skill's documentation for the agent.
                    </span>
                    <Editor bind:code={code} language="python"
                            class="flex-grow h-100 justify-stretch flex overflow-y-scroll"/>
                </div>
            </div>
        </form>
        <Dialog.Footer>
            {#if skill instanceof SavedSkillSpecification}
                <Button disabled={!canSave} on:click={saveAndClose}>Save</Button>
            {:else if skill instanceof SkillSpecification}
                <Button disabled={!canSave} on:click={saveAndClose}>Create</Button>
            {/if}
            <Button variant="ghost" on:click={() => open = false}>Cancel</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>