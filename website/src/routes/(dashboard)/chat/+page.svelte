<script lang="ts">
    import {Activity, CreditCard, DollarSign, Download, Users} from "lucide-svelte";
    import {Button} from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import * as Tabs from "$lib/components/ui/tabs";
    import {Chat} from "$lib/dashboard/chat";
    import {Icons} from "$lib/icons";
    import {PlusCircled, Check} from "radix-icons-svelte";
    import {activeSession, listSessions} from "$lib/services";
    import {Session} from "restClient";

    let sessions: Session[] = [];
    let isLoaded = false;
    let showSidebar = false;
    listSessions().then(values => {
        sessions = values;
        isLoaded = true;
    });

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
                        <h1 class="mb-2 px-4 text-2xl font-semibold tracking-tight">
                            Chats
                        </h1>
                        <Button variant="outline">
                            <PlusCircled class="mr-2 h-4 w-4"/>
                            Create
                        </Button>

                    </div>
                    <div class="space-y-1">
                        {#each sessions as session}
                            <Button variant={$activeSession?.id === session.id ? "secondary" : "ghost"}
                                    class="w-full justify-start"
                                    on:click={()=> activeSession.set(session)}>
                                <Icons.logo/>
                                <span class="text-sm text-gray-400">
                                    {session.agents.map(agent => agent.name).join(", ")}
                                </span>
                            </Button>
                        {:else}
                            <div class="mt-1 w-full justify-start text-gray-400">No chats</div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>


        <div class="col-span-3 lg:col-span-4 lg:border-l">
            <Chat/>
        </div>
    </div>
</div>