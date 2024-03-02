<script lang="ts">
    import * as Table from "$components/table";
    import {Badge} from "$components/badge";
    import {Button} from "$components/button";
    import {Edit, Delete, Plus} from "lucide-svelte";
    import CreateApiKeyDialog from "./create-api-key-dialog.svelte";
    import {apiKeysState} from "$lib/services/api-key-service";
    import DeleteDialog from "$lib/delete-dialog.svelte";
    import {SavedApiKey} from "api-client";

    $: state = $apiKeysState;
    $: keys = state.keys;
    let deleteKeys = [];

    async function deleteKey(key: SavedApiKey) {
        deleteKeys.push(key);
        await state.deleteApiKey(key);
        deleteKeys = deleteKeys.filter(k => k !== key);
    }
</script>


<Table.Root>
    <Table.Header>
        <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Secret Key</Table.Head>
            <Table.Head>Created</Table.Head>
            <Table.Head class="text-right"></Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#if ($keys.length === 0)}
            <Table.Row>
                <Table.Cell colspan="4" class="text-center">No API keys found</Table.Cell>
            </Table.Row>
        {:else}
            {#each $keys as key}
                <Table.Row>
                    <Table.Cell class="font-medium">{key.name}</Table.Cell>
                    <Table.Cell>
                        <Badge variant="secondary">sk-**************{key.secretSuffix}</Badge>
                    </Table.Cell>
                    <Table.Cell>{key.createdAt}</Table.Cell>
                    <Table.Cell class="text-right">
                        <DeleteDialog on:delete={() => deleteKey(key)}
                                      variant="ghost"
                                      showText={false}
                                      isLoading={deleteKeys.includes(key)}>
                            <Table.Root>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Head>Name:</Table.Head>
                                        <Table.Head>{key.name}</Table.Head>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Head>Created:</Table.Head>
                                        <Table.Head>{key.createdAt}</Table.Head>
                                    </Table.Row>
                                </Table.Body>
                            </Table.Root>
                        </DeleteDialog>
                    </Table.Cell>
                </Table.Row>
            {/each}
        {/if}
    </Table.Body>
</Table.Root>
<br>
<CreateApiKeyDialog/>
