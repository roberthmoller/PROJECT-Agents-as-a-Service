<script lang="ts">
    import {Copy, Link, Plus, Unlink} from "lucide-svelte";
    import {Button} from "$components/button";
    import {ModelProviderConnection} from "api-client";
    import {ProviderService} from "$lib/services/provider-service";
    import {Label} from "$components/label";
    import {Input} from "$components/input";
    import Reload from "svelte-radix/Reload.svelte";
    import * as Dialog from "$components/dialog";

    export let
        provider: ModelProviderConnection,
        service: ProviderService;
    let isDialogOpen = false,
        apiKey = "",
        isCreating = false;

    $: canSave = apiKey.length > 0 && !isCreating;

    async function saveAndClose() {
        isCreating = true;
        await service.connectProvider(provider.id, apiKey);
        apiKey = "";
        isCreating = false;
        isDialogOpen = false;
    }
</script>


<Dialog.Root bind:open={isDialogOpen}>
    <Dialog.Trigger asChild>
        {#if provider.isConnected}
            <Button variant="destructive" size="sm" class="mr-2"
                    on:click={() => service.disconnectProvider(provider.id)}>
                <Unlink class="w-4 mr-2"/>
                Disconnect
            </Button>
        {:else}
            <Button variant="primary" size="sm" class="mr-2"
                    on:click={() => isDialogOpen = true}>
                <Link class="w-4 mr-2"/>
                Connect
            </Button>
        {/if}
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>
                <img src={provider.logo} class="w-6 h-6 mr-2 inline-block rounded-lg" alt={provider.name + "logo"}/>
                {provider.name} API key
            </Dialog.Title>
            <Dialog.Description>
                Connect your {provider.name} API key to integrate their services with the platform.
                <a href={provider.api_key_url} class="text-blue-400 underline" target="_blank">{provider.name} Create a key here.</a>.
            </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
            <div class="grid gap-2">
                <Label for="url">API key<span class="text-red-700">*</span></Label>
                <Input
                        id="apiKey"
                        placeholder="Enter the {provider.name} API key"
                        type="password"
                        autocorrect="off"
                        required
                        bind:value={apiKey}
                />
            </div>
        </div>
        <Dialog.Footer>
            <!--            <Button type="submit" disabled={!canSave}-->
            <!--                    on:click={saveAndClose}>-->
            <!--                &lt;!&ndash;{#if isCreating}&ndash;&gt;-->
            <!--                &lt;!&ndash;    <Reload class="w-4 h-4 mr-2 animate-spin"/>&ndash;&gt;-->
            <!--                &lt;!&ndash;{/if}&ndash;&gt;-->
            <!--                Test-->
            <!--            </Button>-->

            <Button type="submit" disabled={!canSave}
                    on:click={saveAndClose}>
                {#if isCreating}
                    <Reload class="w-4 h-4 mr-2 animate-spin"/>
                {/if}
                Connect
            </Button>
            <Button variant="ghost"
                    disabled={isCreating}
                    on:click={() => isDialogOpen = false}>
                Cancel
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>