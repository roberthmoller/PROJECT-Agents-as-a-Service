<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import {Button} from "$lib/components/ui/button";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
    import {AgentSpecification, SavedAgentSpecification} from "restClient";
    import {agentApi} from "$lib/api";
    import {toast} from "svelte-sonner";

    export let agent: SavedAgentSpecification;

    let agentName = agent.name;
    let agentInstructions = agent.systemMessage;
    let agentBackstory = agent.description;
    let open = false;

    const saveAgent = async () => {
        let agentSpecification = new AgentSpecification();
        agentSpecification.systemMessage = agentInstructions;
        agentSpecification.name = agentName;
        agentSpecification.description = agentBackstory;

        try {
            toast.promise(
                agentApi.updateAgentAgentsAgentIdPut(agent.id, agentSpecification), {
                    loading: "Saving agent...",
                    success: "Agent saved successfully",
                    error: "Failed to save agent",
                    description: "This might take some seconds. Please wait..."
                }
            );
            open = false;
        } catch (e: any) {
            console.error("Error saving agent: ", e);
        }
    }
</script>

<Dialog.Root bind:open={open}>
    <Dialog.Trigger asChild let:builder>
        <Button size="sm" builders={[builder]} class="relative">Edit</Button>
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Edit {agent.name}</Dialog.Title>
            <Dialog.Description>Redefine the agent and its capabilities.</Dialog.Description>
        </Dialog.Header>
        <form on:submit|preventDefault>
            <div class="grid gap-4 py-4">
                <div class="grid gap-2">
                    <Label for="url">Name</Label>
                    <Input
                            id="name"
                            placeholder="Pirate Paul"
                            type="name"
                            autocapitalize="words"
                            autocorrect="off"
                            bind:value={agentName}
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="url">Instructions</Label>
                    <Input
                            id="instructions"
                            placeholder="You are a pirate called Paul and you talk like a pirate that has been at sea for 20 years."
                            autocorrect="on"
                            bind:value={agentInstructions}
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="url">Backstory</Label>
                    <Input
                            id="backstory"
                            placeholder="A pirate that has been at sea for 20 years."
                            autocorrect="on"
                            bind:value={agentBackstory}
                    />
                </div>
            </div>
        </form>
        <Dialog.Footer>
            <Button on:click={saveAgent}>Save</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>