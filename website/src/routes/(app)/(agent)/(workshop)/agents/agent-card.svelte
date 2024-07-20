<script lang="ts">
    import * as Dialog from "$components/dialog";
    import * as Card from "$components/card";
    import {Button} from "$components/button";
    import {SavedAgentSpecification} from "api-client";
    import {agentApi} from "$lib/api";
    import AgentDialog from "./agent-dialog.svelte";
    import {workshopStore} from "$lib/services";
    import DeleteDialog from "$lib/delete-dialog.svelte";

    export let agent: SavedAgentSpecification;
    $: state = $workshopStore;


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
            <AgentDialog {agent}/>
            <DeleteDialog on:delete={() => state.deleteAgent(agent)} showIcon={false}>
                {agent.name}
            </DeleteDialog>
        </div>
    </Card.Footer>
</Card.Root>
