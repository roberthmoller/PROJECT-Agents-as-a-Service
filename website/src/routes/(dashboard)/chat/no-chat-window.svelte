<script lang="ts">
    import * as Command from "$lib/components/ui/command";
    import * as Dialog from "$lib/components/ui/dialog";
    import * as Card from "$lib/components/ui/card";
    import {toast} from "svelte-sonner";
    import {Check, CrossCircled, Face} from "radix-icons-svelte";
    import * as Tooltip from "$lib/components/ui/tooltip";
    import * as Avatar from "$lib/components/ui/avatar";
    import {Badge} from "$lib/components/ui/badge";
    import {Button} from "$lib/components/ui/button";
    import * as Popover from "$lib/components/ui/popover";
    import {tick} from "svelte";
    import {activeSession, agentsMapStore, createSession, sendMessage} from "$lib/services";
    import {cn} from "$lib/utils";
    import {ChevronsUpDown, Plus, Send} from "lucide-svelte";
    import {Input} from "$lib/components/ui/input";
    import {SessionSpecification} from "restClient";


    $: agents = $agentsMapStore;
    $: selectedAgents = new Map<any, boolean>();
    $: open = false;
    $: input = "";
    $: canInitiate = selectedAgents.size > 1 && input.length > 1;


    function selectAgent(agentId: string) {
        if (selectedAgents.has(agentId)) {
            selectedAgents.delete(agentId);
        } else {
            selectedAgents.set(agentId, true);
        }
        selectedAgents = selectedAgents;
        agents = agents;
    }

    const initiateChat = async () => {
        // Create session with selected agents
        const specification = new SessionSpecification();
        specification.agents = Array.from(selectedAgents.keys());
        const agentNames = Array.from(selectedAgents.keys())
            .map(agentId => agents.value.get(agentId))
            .map(agent => agent?.name)
            .join(", ");

        const sessionPromise = createSession(specification);
        toast.promise(sessionPromise, {
            loading: `Creating session with ${agentNames}`,
            success: `Session created`,
            error: `Failed to create session with ${agentNames}`
        });
        const session = await sessionPromise;

        // make session the activeSession
        activeSession.set(session)
        // send message to session
        await sendMessage(input)
        // toast.error("Message sent", {description: "success"});
    }
</script>

<div class="flex flex-col h-full">
    <div class="flex-grow flex flex-col justify-center align-middle items-center">
        <h1 class="text-lg font-bold">What can I do fo you?</h1>
        <!-- Select agents  -->
        <p class="text-lg">Start a conversation with</p>
        <br>
        <div class="flex flex-row items-center">
            {#each selectedAgents.entries() as [agentId, isSelected]}
                <div class="flex items-center space-x-4 mr-2">
                    <Avatar.Root>
                        <Avatar.Fallback>{agents.value.get(agentId)?.name[0]}</Avatar.Fallback>
                    </Avatar.Root>
                    <div>
                        <p class="text-sm font-medium leading-none">{agents.value.get(agentId)?.name}</p>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <p class="text-sm truncate text-muted-foreground max-w-[8rem]">{agents.value.get(agentId)?.description}</p>
                            </Tooltip.Trigger>
                            <Tooltip.Content sideOffset={10}>
                                <p class="text-sm text-muted-foreground max-w-[16rem]">{agents.value.get(agentId)?.description}</p>
                            </Tooltip.Content>
                        </Tooltip.Root>
                    </div>
                </div>
            {/each}

            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <Button
                            size={selectedAgents.size > 0 ? "icon" : "default"}
                            variant="outline"
                            class="ml-auto rounded-full"
                            on:click={() => (open = true)}>
                        <Plus class="h-4 w-4"/>
                        {#if selectedAgents.size > 0}
                            <span class="sr-only">Add agents</span>
                        {:else }
                            <span class="ml-2">Add agents</span>
                        {/if}
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content sideOffset={10}>Add agents</Tooltip.Content>
            </Tooltip.Root>
        </div>
    </div>
    <!-- Start typing message-->
    <form class="mb-4 flex w-full justify-center items-center space-x-2">
        <Input
                id="message"
                placeholder="Type your message..."
                class="w-1/2 self-center text-lg px-8 py-6"
                autocomplete="off"
                bind:value={input}
        />
        <Button type="submit" variant="ghost" size="icon" disabled={!canInitiate}
                on:click={initiateChat}>
            <Send class="h-4 w-4"/>
            <span class="sr-only">Send</span>
        </Button>
    </form>
</div>


<Dialog.Root bind:open>
    <Dialog.Content class="gap-0 p-0 outline-none">
        <Dialog.Header class="px-4 pb-4 pt-5">
            <Dialog.Title>Add agents</Dialog.Title>
            <Dialog.Description>
                Add agents to this chat. This will create a new group chat.
            </Dialog.Description>
        </Dialog.Header>
        <Command.Root class="overflow-hidden rounded-t-none border-t bg-transparent">
            <Command.Input placeholder="Search for agents..."/>
            <Command.List>
                <Command.Empty>No agents found.</Command.Empty>
                <Command.Group heading="Your agents" class="p-2">
                    {#each agents.value.entries() as [agentId, agent]}
                        <Command.Item class="flex items-center px-2" onSelect={()=>selectAgent(agentId)}>
                            <Avatar.Root>
                                <Avatar.Fallback>{agent.name[0]}</Avatar.Fallback>
                            </Avatar.Root>
                            <div class="ml-2">
                                <p class="text-sm font-medium leading-none">
                                    {agent.name}
                                </p>
                                <p class="text-sm text-muted-foreground">
                                    {agent.description}
                                </p>
                            </div>
                            {#if selectedAgents.has(agentId)}
                                <Check class="ml-auto flex h-5 w-5 text-primary"/>
                            {/if}
                        </Command.Item>
                    {/each}
                </Command.Group>
            </Command.List>
        </Command.Root>
        <Dialog.Footer class="flex items-center border-t p-4 sm:justify-between">
            {#if selectedAgents.size > 0}
                <div class="flex -space-x-2 overflow-hidden">
                    {#each selectedAgents.entries() as [agentId, _]}
                        <Avatar.Root class="inline-block border-2 border-background">
                            <!--                            <Avatar.Image src={agent.avatar} />-->
                            <Avatar.Fallback>{agents.value.get(agentId)?.name[0]}</Avatar.Fallback>
                        </Avatar.Root>
                    {/each}
                </div>
            {:else}
                <p class="text-sm text-muted-foreground">Select agents to add to this chat.</p>
            {/if}
            <Button disabled={selectedAgents.size < 1} on:click={() => (open = false)}>
                Done
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>