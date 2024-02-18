<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import * as Card from "$lib/components/ui/card";
    import {Button} from "$lib/components/ui/button";
    import {SavedAgentSpecification} from "restClient";
    import {agentApi} from "$lib/api";
    import EditAgentDialog from "./edit-agent-dialog.svelte";
    export let agent: SavedAgentSpecification;
    let deleteDialogOpen = false;

    const deleteAgent = async () => {
        await agentApi.deleteAgentAgentsAgentIdDelete(agent.id)
        closeDeleteDialog();
    }

    const closeDeleteDialog = () => deleteDialogOpen = false;
</script>

<Card.Root class="relative">
    <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <Card.Title class="text-sm font-medium">{agent.name}</Card.Title>
    </Card.Header>
    <Card.Content>
        <p class="text-sm text-muted-foreground h-[4rem]">
            {agent.description}
        </p>
    </Card.Content>
    <Card.Footer>
        <div class="flex w-full justify-end space-x-2">
<!--            <Button variant="ghost">Edit</Button>-->
            <EditAgentDialog {agent}/>
            <Dialog.Root bind:open={deleteDialogOpen}>
                <Dialog.Trigger>
                    <Button variant="destructive">Delete</Button>
                </Dialog.Trigger>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
                        <Dialog.Description>
                            This action cannot be undone. This will
                            permanently delete your account and remove your
                            data from our servers.
                        </Dialog.Description>
                        <Dialog.Footer>
                            <Button type="submit" variant="destructive" on:click={deleteAgent}>Delete</Button>
                            <Button type="submit"  on:click={closeDeleteDialog}>Cancel
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Header>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    </Card.Footer>
</Card.Root>
