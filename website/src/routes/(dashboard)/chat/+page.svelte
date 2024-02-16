<script lang="ts">
    import {
        Activity,
        CreditCard,
        DollarSign,
        Download,
        Users,
    } from "lucide-svelte";
    import {Button} from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import * as Tabs from "$lib/components/ui/tabs";
    import {Chat} from "$lib/dashboard/chat";
    import {Icons} from "$lib/icons";
    import {PlusCircled, Check} from "radix-icons-svelte";
    import {activeSession, listSessions} from "$lib/services";
    import {AgentSpecification, SavedSessionSpecification, Session} from "restClient";
    import {collection, getDocs} from "firebase/firestore";
    import {authenticatedState, db} from "$lib/firebase";
    import {onMount} from "svelte";
    import type {User} from "firebase/auth";

    let sessions: Session[] = [];
    let isLoaded = false;
    let didFail = false;
    let showSidebar = false;
    let user = $authenticatedState;
    listSessions()
        .then((values) => {
            sessions = values;
            isLoaded = true;
        })
        .catch((err) => (didFail = true));

    async function fetchAgents() {
        try {
            const agentSpecifications = await getDocs(collection(db, "agents"));
            const agentData = agentSpecifications.docs.map((doc) => doc.data() as AgentSpecification);
        } catch (error) {
            console.error("Error loading agents: ", error);
            didFail = true;
        } finally {
            isLoaded = true;
        }
    }
    async function fetchSessions(user: User) {
        try {
            const sessionSpecifications = await getDocs(collection(db, `v1/public/users/${user.uid}/sessions`));
            const sessionData = sessionSpecifications.docs.map((doc) => doc.data() as Session);

        } catch (error) {
            console.error("Error loading agents: ", error);
            didFail = true;
        } finally {
            isLoaded = true;
        }
    }

    onMount(() => fetchSessions(user));
</script>

<div class="bg-background h-full">
    <div class="grid md:grid-cols-5 h-full">
        <!--        Should be lg-->
        <!--    <div class="grid lg:grid-cols-5 h-full">-->
        <div class="hidden md:block">
            <!--        Should be lg-->
            <!--        <div class="hidden lg:block">-->
            <div class="space-y-4 py-4">
                <div class="px-3 py-2">
                    <div class="flex justify-between align-top w-full">
                        <h1
                                class="mb-2 px-4 text-2xl font-semibold tracking-tight"
                        >
                            Chats
                        </h1>
                        <Button variant="outline">
                            <PlusCircled class="mr-2 h-4 w-4"/>
                            Create
                        </Button>
                    </div>
                    <div class="space-y-1">
                        {#if isLoaded}
                            {#each sessions as session}
                                <Button
                                        variant={$activeSession?.id === session.id
                                        ? "secondary"
                                        : "ghost"}
                                        class="w-full justify-start"
                                        on:click={() => activeSession.set(session)}
                                >
                                    <Icons.logo/>
                                    <span class="text-sm text-gray-400">
                                        {session.agents
                                            .map((agent) => agent.name)
                                            .join(", ")}
                                    </span>
                                </Button>
                            {:else}
                                <div
                                        class="mt-1 w-full justify-start text-gray-400"
                                >
                                    No chats
                                </div>
                            {/each}
                        {:else if didFail}
                            <div
                                    class="mt-1 w-full justify-start text-gray-400"
                            >
                                Could not load...
                            </div>
                        {:else}
                            <div
                                    class="mt-1 w-full justify-start text-gray-400"
                            >
                                Loading...
                            </div>

                        {/if}
                    </div>
                </div>
            </div>
        </div>

        <div class="col-span-3 lg:col-span-4 lg:border-l">
            <Chat/>
        </div>
    </div>
</div>
