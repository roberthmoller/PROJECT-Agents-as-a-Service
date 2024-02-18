<script lang="ts">
    import {activeSession, agentsMapStore, refreshAgents, refreshSessions, sessionsStore} from "$lib/services";
    import {PlusCircled, Reload} from "radix-icons-svelte";
    import * as Sheet from "$lib/components/ui/sheet";
    import {Input} from "$lib/components/ui/input";
    import {Label} from "$lib/components/ui/label";
    import {Button} from "$lib/components/ui/button";
    import {onMount} from "svelte";

    $: sessions = $sessionsStore;
    $: agents = $agentsMapStore;
    onMount(refreshSessions);
    onMount(refreshAgents);


</script>

<!--<div class="grid grid-cols-2 gap-2">-->
<Sheet.Root>
    <Sheet.Trigger asChild let:builder>
        <!--        <Button builders={[builder]} variant="outline">Left</Button>-->

        <div class="space-y-4 py-4">
            <div class="px-3 py-2">
                <div class="flex justify-between align-top w-full">
                    <h1 class="mb-2 px-4 text-2xl font-semibold tracking-tight">Chats</h1>
                    <Button variant="outline" on:click={() =>activeSession.set(null)}>
                        <PlusCircled class="mr-2 h-4 w-4"/>
                        Create
                    </Button>
                </div>
                <div class="space-y-1">
                    {#if sessions.isLoaded}
                        {#each sessions.value as session}
                            <Button
                                    variant={$activeSession?.id === session.id
                                        ? "secondary"
                                        : "ghost"}
                                    class="w-full justify-start"
                                    on:click={() => activeSession.set(session)}>
                                <!--                                    <Icons.logo/>-->
                                <span class="text-sm text-gray-400">
                                        {session.agents
                                            .map((agent) => agents.value.get(agent)?.name)
                                            .join(", ")}
                                    </span>
                            </Button>
                        {:else}
                            <div class="mt-1 w-full justify-start text-gray-400">
                                No chats
                            </div>
                        {/each}
                    {:else if sessions.error}
                        <div class="mt-1 w-full justify-start text-gray-400">
                            Could not load...
                        </div>
                    {:else}
                        <div class="mt-1 w-full flex justify-start text-gray-400">
                            <Reload class="mr-2 h-4 w-4 animate-spin"/>
                            Loading...
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </Sheet.Trigger>
    <Sheet.Content side="left">
        <Sheet.Header>
            <Sheet.Title>Edit profile</Sheet.Title>
            <Sheet.Description>
                Make changes to your profile here. Click save when you're done.
            </Sheet.Description>
        </Sheet.Header>
        <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">Name</Label>
                <Input id="name" value="Pedro Duarte" class="col-span-3"/>
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
                <Label for="username" class="text-right">Username</Label>
                <Input id="username" value="@peduarte" class="col-span-3"/>
            </div>
        </div>
        <Sheet.Footer>
            <Sheet.Close asChild let:builder>
                <Button builders={[builder]} type="submit">Save changes</Button>
            </Sheet.Close>
        </Sheet.Footer>
    </Sheet.Content>
</Sheet.Root>
