<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import {Button} from "$lib/components/ui/button";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
    import {AgentSpecification} from "restClient";
    import {agentApi} from "$lib/api";
    import {toast} from "svelte-sonner";

    let open = false;
    let agentName = "";
    let agentInstructions = "";
    let agentBackstory = "";

    async function createAgent() {
        let agentSpecification = new AgentSpecification();
        agentSpecification.systemMessage = agentInstructions;
        agentSpecification.name = agentName;
        agentSpecification.description = agentBackstory;

        try {
            toast.promise(
                agentApi.createAgentAgentsPost(agentSpecification), {
                    loading: "Creating agent...",
                    success: "Agent created successfully",
                    error: "Failed to create agent",
                    description: "This might take some seconds. Please wait..."
                }
            );
            open = false;
        } catch (e: any) {
            console.error("Error adding document: ", e);
            // toast.error("Failed to create agent", {description: e.toString()});
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
        <!--        TODO: Submit on return -->
        <form on:submit|preventDefault={createAgent}>
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
            <Button on:click={createAgent}>Create</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>