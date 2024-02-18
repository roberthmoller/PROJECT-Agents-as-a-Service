<script lang="ts">
    import {Check, PaperPlane} from "radix-icons-svelte";
    import * as Avatar from "$lib/components/ui/avatar";
    import * as Card from "$lib/components/ui/card";
    import * as Command from "$lib/components/ui/command";
    import * as Dialog from "$lib/components/ui/dialog";
    import * as Tooltip from "$lib/components/ui/tooltip";
    import {Button} from "$lib/components/ui/button";
    import {Input} from "$lib/components/ui/input";
    import {authenticatedState} from "$lib/firebase";
    import {activeSession, activeSessionMessages, sendMessage} from "$lib/services"
    import {Badge} from "$lib/components/ui/badge";
    import {agentsMapStore} from "$lib/services/index.js";
    import {SavedMessageModel} from "api-client";

    let user = $authenticatedState;
    let open = false;

    let input = "";
    $: inputLength = input.trim().length;
    $: session = $activeSession
    $: agents = $agentsMapStore;
    $: selectedAgents = session?.agents.map((agent: string) => agents.value.get(agent)!) ?? [];
    $: sessionMessages = $activeSessionMessages
    $: messages = $sessionMessages


    function named(senderId: string | null): string {
        if (senderId === null) return "";
        return (agents.value.get(senderId)?.name ?? senderId);
    }


</script>

<Card.Root class="flex-col flex h-full border-0">
    <Card.Header class="flex flex-row items-center border-b">
        {#if selectedAgents.length < 1}
            <h2 class="mb-2 px-4 text2xl font-semibold tracking-tight text-muted-foreground">New chat</h2>
        {:else}
            <div class="flex items-center space-x-4">
                {#each selectedAgents as agent}
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <div class="flex space-x-4 align-middle">
                                <Avatar.Root>
                                    <Avatar.Fallback>{agent.name[0]}</Avatar.Fallback>
                                </Avatar.Root>
                                <div class="flex flex-col items-start text-left">
                                    <p class="text-sm font-medium leading-none">{agent.name}</p>
                                    <p class="text-sm text-muted-foreground w-[8rem] truncate">{agent.description}</p>
                                </div>
                            </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content sideOffset={10}>{agent.systemMessage}</Tooltip.Content>
                        <!--                        <Tooltip.Content >New message</Tooltip.Content>-->
                    </Tooltip.Root>
                {/each}
            </div>
        {/if}

        <Button
                variant="outline"
                class="ml-auto"
                on:click={() => (open = true)}
        >
            {#if selectedAgents.length > 0}
                Manage agents
            {:else}
                Add agents
            {/if}
        </Button>

    </Card.Header>

    <Card.Content class="flex-grow">
        <div class="space-y-4 flex flex-col justify-end">
            {#each messages as message}
                {#if message.sender === user?.uid}
                    <div class="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">
                        {message.content}
                    </div>
                {:else }
                    <div class="flex flex-col justify-end ">
                        <span class="ml-3 text-muted-foreground">
                            {named(message.sender)}
                        </span>
                        <div class="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
                            {message.content}
                        </div>
                    </div>
                {/if}

            {/each}
        </div>
    </Card.Content>
    <Card.Footer>
        <form
                on:submit={(event) => {
        				event.preventDefault();
        				if (inputLength === 0) return;
                        let message = new SavedMessageModel()
                        message.sender = user.uid
                        message.content = input
                        messages.push(message)
        				sendMessage(input)
        				input = "";
        			}}
                class="flex w-full items-center space-x-2"
        >
            <Input
                    id="message"
                    placeholder="Type your message..."
                    class="flex-1"
                    autocomplete="off"
                    bind:value={input}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
                <PaperPlane class="h-4 w-4"/>
                <span class="sr-only">Send</span>
            </Button>
        </form>
    </Card.Footer>
</Card.Root>

<Dialog.Root bind:open>
    <Dialog.Content class="gap-0 p-0 outline-none">
        <Dialog.Header class="px-4 pb-4 pt-5">
            <Dialog.Title>Invite agents</Dialog.Title>
            <Dialog.Description>
                Invite agents to this thread. This will create a new group chat.
            </Dialog.Description>
        </Dialog.Header>
        <Command.Root class="overflow-hidden rounded-t-none border-t bg-transparent">
            <Command.Input placeholder="Search user..."/>
            <Command.List>
                <Command.Empty>No agents found.</Command.Empty>
                <Command.Group class="p-2">
                    {#each agents.value.values() as agent}
                        <Command.Item
                                class="flex items-center px-2"
                        >

                            <Avatar.Root>
                                <!--                                <Avatar.Image src={user.avatar} alt="Image"/>-->
                                <Avatar.Fallback>{agent.name[0]}</Avatar.Fallback>
                            </Avatar.Root>
                            <div class="ml-2">
                                <p class="text-sm font-medium leading-none">{agent.name}</p>
                                <p class="text-sm text-muted-foreground">{agent.systemMessage}</p>

                                <div class="mt-2">
                                    {#each agent.models ?? [] as model}
                                        <Badge>{model}</Badge>
                                    {/each}
                                </div>
                            </div>
                            {#if selectedAgents.includes(agent)}
                                <Check class="ml-auto flex h-5 w-5 text-primary"/>
                            {:else}
                                <Check class="hidden ml-auto flex h-5 w-5 text-primary"/>
                            {/if}
                        </Command.Item>
                    {/each}
                </Command.Group>
            </Command.List>
        </Command.Root>

        <Dialog.Footer class="flex items-center border-t p-4 sm:justify-between">
            {#if selectedAgents.length}
                <div class="flex -space-x-2 overflow-hidden">
                    {#each selectedAgents as user}
                        <Avatar.Root class="inline-block border-2 border-background">
                            <!--                            <Avatar.Image src={user.avatar}/>-->
                            <Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
                        </Avatar.Root>
                    {/each}
                </div>
            {:else}
                <p class="text-sm text-muted-foreground">Select agents to add to this thread.</p>
            {/if}
            <Button disabled={selectedAgents.length < 1} on:click={() => (open = false)}>
                Save
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>