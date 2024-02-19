<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import {Button} from "$lib/components/ui/button";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
    import {PipRequirement, SkillSpecification} from "restClient";
    import Editor from "./editor.svelte"

    let open = false;
    let name = "";
    let requirement: PipRequirement[] = [];
    let code = "import autogen";

    async function createSkill() {
        let skill = new SkillSpecification();
        skill.name = name;
        skill.requirements = requirement;
        skill.code = code;

        try {
            // toast.promise(
            //     agentApi.createAgentAgentsPost(null), {
            //         loading: "Creating agent...",
            //         success: "Agent created successfully",
            //         error: "Failed to create agent",
            //         description: "This might take some seconds. Please wait..."
            //     }
            // );
            open = false;
        } catch (e: any) {
            console.error("Error creating skill: ", e);
        }
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger asChild let:builder>
        <Button size="sm" builders={[builder]} class="relative">Create</Button>
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Create an agent</Dialog.Title>
            <Dialog.Description>Define a new agent and its capabilities.</Dialog.Description>
        </Dialog.Header>
        <form on:submit|preventDefault>
            <div class="grid gap-4 py-4">
                <div class="grid gap-2">
                    <Label for="url">Name</Label>
                    <Input
                            id="name"
                            placeholder="Descriptive title of the skill, e.g. Search for Wikipedia articles."
                            type="text"
                            autocapitalize="words"
                            autocorrect="off"
                            bind:value={name}
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="url">Requirements</Label>
<!--                    Todo: Make a select box where you can delete/add reqs and change their version-->
                    <Input
                            id="requirements"
                            placeholder="A list of requirements that the skill needs to be able to run. E.g. pip install wikipedia."
                            autocorrect="on"
                            bind:value={requirement}
                    />
                </div>
                <div class=" h-[25rem] flex space-y-2 flex-col">
                    <Label for="code">Code</Label>
                    <Editor bind:code={code} class="flex-grow h-100 justify-stretch flex overflow-y-scroll"/>
                </div>
            </div>
        </form>
        <Dialog.Footer>
            <Button on:click={createSkill}>Create</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>