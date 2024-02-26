<script lang="ts">
    import {Button} from "$components/button";
    import * as Dialog from "$components/dialog";
    import {createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher()
    let isOpen = false;

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
        <Button variant="destructive">Delete</Button>
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
            <Dialog.Description>
                <p class="line-through bg-red-950 text-red-700 rounded-sm my-2 px-1">
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