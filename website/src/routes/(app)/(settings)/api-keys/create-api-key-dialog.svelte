<script lang="ts">
    import {Button} from "$components/button";
    import {Input} from "$components/input";
    import {Label} from "$components/label";
    import * as Dialog from "$components/dialog";
    import {Edit, Delete, Plus, Copy} from "lucide-svelte";
    import {apiKeysState} from "$lib/services/api-key-service";
    import {toast} from "svelte-sonner";
    import Reload from "svelte-radix/Reload.svelte";

    let isCreateOpen = false, isPreviewOpen = false;
    let keyName = "";
    let keyPreview = "";
    let isCreating = false;
    $: state = $apiKeysState;
    $: canSave = keyName.trim().length > 0 || !isCreating;


    async function saveAndClose() {
        isCreating = true;
        const secretApiKey = await state.createApiKey(keyName);
        keyName = "";
        isCreateOpen = false;
        isCreating = false;

        keyPreview = secretApiKey.secretKey;
        isPreviewOpen = true;
    }

    function copyKeyPreview() {
        navigator.clipboard.writeText(keyPreview);
        toast.success("API key copied to clipboard");
    }

    function closePreview() {
        keyPreview = "";
        isPreviewOpen = false;
    }
</script>

<Dialog.Root bind:open={isCreateOpen}>
    <Dialog.Trigger>
        <Button>
            <Plus class="mr-2 h-4 w-4"/>
            Create API Key
        </Button>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>Create API key</Dialog.Title>
            <Dialog.Description>
                Make changes to your profile here. Click save when you're done.
            </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
            <div class="grid gap-2">
                <Label for="url">Name<span class="text-red-700">*</span></Label>
                <Input
                        id="name"
                        placeholder="Enter a name for the API key"
                        type="text"
                        autocorrect="off"
                        required
                        bind:value={keyName}
                />
            </div>
        </div>
        <Dialog.Footer>
            <Button type="submit" disabled={!canSave}
                    on:click={saveAndClose}>
                {#if isCreating}
                    <Reload class="w-4 h-4 mr-2 animate-spin"/>
                {/if}    Create
            </Button>
            <Button variant="ghost"
                    disabled={isCreating}
                    on:click={() => isCreateOpen = false}>
                Cancel
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>


<Dialog.Root bind:open={isPreviewOpen}>
    <Dialog.Content class="sm:max-w-[475px]">
        <Dialog.Header>
            <Dialog.Title>Save the key</Dialog.Title>
            <Dialog.Description>
                After you close this dialog, it will be hidden forever. Make sure to save it somewhere safe.
            </Dialog.Description>
        </Dialog.Header>
        <form class="flex w-full items-center space-x-2">
            <Input
                    class="flex-grow"
                    type="text"
                    readonly
                    bind:value={keyPreview}
            />
            <Button on:click={copyKeyPreview}>
                <Copy class="mr-2 h-4 w-4"/>
                Copy
            </Button>
        </form>
        <Dialog.Footer>
            <Button type="submit"
                    variant="ghost"
                    on:click={closePreview}>
                Done
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>