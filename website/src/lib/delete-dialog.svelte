<script lang="ts">
    import {Button} from "$components/button";
    import * as Dialog from "$components/dialog";
    import {createEventDispatcher} from 'svelte'
    import {Delete} from "lucide-svelte";
    import Reload from "svelte-radix/Reload.svelte";

    const dispatch = createEventDispatcher()
    let isOpen = false;
    export let variant = 'destructive', size = 'md', showText = true, isLoading = false, showIcon = true;

    function confirm() {
        isOpen = false;
        dispatch('delete', true)
    }

    function cancel() {
        isOpen = false;
    }
</script>

<Dialog.Root bind:open={isOpen}>
    <Dialog.Trigger>
        <Button variant={variant} size={size} disabled={isLoading}>
            {#if showIcon}
                {#if isLoading}
                    <Reload class="w-4 h-4 mr-2 animate-spin"/>
                {:else}
                    <Delete class="w-4 h-4 mr-2"/>
                {/if}
            {/if}
            {#if showText}
                Delete
            {/if}
        </Button>
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
            <Dialog.Description>
                <p class="bg-red-950 text-red-700 rounded-sm my-2 px-1">
                    <slot/>
                </p>
                <p>
                    This action cannot be undone. This will
                    permanently delete your account and remove your
                    data from our servers.
                </p>
            </Dialog.Description>
            <Dialog.Footer>
                <Button type="submit" variant="destructive" on:click={confirm}>Delete</Button>
                <Button type="submit" on:click={cancel}>Cancel
                </Button>
            </Dialog.Footer>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>