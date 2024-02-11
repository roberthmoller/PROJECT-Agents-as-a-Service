<script lang="ts">
    // list all agents and display them
    // add a button to add a new agent
    // add a button to edit/delete an agent
    import { Reload } from "radix-icons-svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { Label } from "$lib/components/ui/label";
    import { Input } from "$lib/components/ui/input";
    import { User } from "lucide-svelte";
    import { type AgentSpecification } from "api-client";
    import { db } from "$lib/firebase";
    import { collection, getDocs } from "firebase/firestore";
    import { onMount } from "svelte";
    import { PlusCircle } from "lucide-svelte";
    let agents: AgentSpecification[] = [];
    let isLoaded = false;
    let didFail = false;

    function fetchAgents() {
        getDocs(collection(db, "agents"))
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    agents.push(doc.data() as AgentSpecification);
                });
                isLoaded = true;
            })
            .catch((error) => {
                console.error("Error loading agents: ", error);
                didFail = true;
            });
    }

    onMount(fetchAgents);
</script>

<div class="h-full px-4 py-6 lg:px-8">
    <div class="flex justify-between">
        <h2 class="text-2xl font-semibold">Agents</h2>
        <Button variant="outline">
            <PlusCircle class="w-4 mr-2" />
            Create
        </Button>
    </div>
    {#if isLoaded && agents.length > 0}
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {#each agents as agent}
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <Card.Root class="relative">
                            <Card.Header
                                class="flex flex-row items-center justify-between space-y-0 pb-2"
                            >
                                <Card.Title class="text-sm font-medium"
                                    >{agent.name}</Card.Title
                                >
                            </Card.Header>
                            <Card.Content>
                                <p class="text-sm text-muted-foreground">
                                    {agent.systemMessage}
                                </p>
                            </Card.Content>
                            <Card.Footer>
                                <div class="flex w-full justify-end space-x-2">
                                    <Button variant="ghost">Edit</Button>
                                    <Button variant="destructive">Delete</Button
                                    >
                                </div>
                            </Card.Footer>
                        </Card.Root>
                    </Dialog.Trigger>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title
                                >Are you sure absolutely sure?</Dialog.Title
                            >
                            <Dialog.Description>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                            </Dialog.Description>
                        </Dialog.Header>
                    </Dialog.Content>
                </Dialog.Root>
            {/each}
        </div>
    {:else if isLoaded && agents.length === 0}
        <div
            class="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed"
        >
            <div
                class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center"
            >
                <User />

                <h3 class="mt-4 text-lg font-semibold">No agents added</h3>
                <p class="mb-4 mt-2 text-sm text-muted-foreground">
                    You have not added any agents. Add one below.
                </p>
                <Dialog.Root>
                    <Dialog.Trigger asChild let:builder>
                        <Button size="sm" builders={[builder]} class="relative"
                            >Add Agent</Button
                        >
                    </Dialog.Trigger>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Add Agent</Dialog.Title>
                            <Dialog.Description>
                                Copy and paste the podcast feed URL to import.
                            </Dialog.Description>
                        </Dialog.Header>
                        <div class="grid gap-4 py-4">
                            <div class="grid gap-2">
                                <Label for="url">Podcast URL</Label>
                                <Input
                                    id="url"
                                    placeholder="https://example.com/feed.xml"
                                />
                            </div>
                        </div>
                        <Dialog.Footer>
                            <Button>Import Podcast</Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Root>
            </div>
        </div>
    {:else if didFail}
        <div class="flex h-[450px] shrink-0 items-center justify-center">
            <div
                class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center"
            >
                <p class="text-lg font-semibold">Failed to load agents</p>
                <p class="mb-4 mt-2 text-sm text-muted-foreground">
                    There was an error loading agents. Please try again.
                </p>
                <Button variant="outline" on:click={fetchAgents}
                    >Try Again</Button
                >
            </div>
        </div>
    {:else}
        <div class="flex h-[450px] shrink-0 items-center justify-center">
            <div
                class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center"
            >
                <p class="text-lg font-semibold">
                    <Reload class="mr-2 h-4 w-4 animate-spin" />
                    Loading agents
                </p>
                <p class="mb-4 mt-2 text-sm text-muted-foreground">
                    Please wait while we load your agents.
                </p>
            </div>
        </div>
    {/if}
</div>
