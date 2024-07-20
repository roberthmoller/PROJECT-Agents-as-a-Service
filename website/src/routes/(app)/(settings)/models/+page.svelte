<script lang="ts">
    import * as Table from "$components/table";
    import {Badge} from "$components/badge";
    import {Button} from "$components/button";
    import {Edit, Delete, Plus, Link, Unlink} from "lucide-svelte";
    import {apiKeysState} from "$lib/services/api-key-service";
    import DeleteDialog from "$lib/delete-dialog.svelte";
    import {SavedApiKey} from "api-client";
    import {providerService} from "$lib/services/provider-service";
    import {Avatar} from "$components/avatar";
    import ConnectProviderDialog from './connect-provider-dialog.svelte';
    import SuperDebug from "sveltekit-superforms";

    $: service = $providerService;
    $: providers = service.providers;
</script>


<Table.Root>
    <Table.Header>
        <Table.Row>
            <Table.Head>Provider</Table.Head>
            <Table.Head>Models</Table.Head>
            <Table.Head class="text-right pr-4">Status</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each $providers as provider}
            <Table.Row>
                <Table.Cell class="font-medium flex items-center">
                    <img class="mr-2 w-6 rounded-lg" src={provider.logo} alt={provider.name}/>
                    {provider.name}
                </Table.Cell>
                <Table.Cell class="max-w-80 space-y-1">
                    {#each provider.models as model}
                        <Badge variant="secondary" class="mr-1">{model.name}</Badge>
                    {/each}
                </Table.Cell>
                <Table.Cell class="text-right">
                    <ConnectProviderDialog {provider} {service}/>
                </Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>