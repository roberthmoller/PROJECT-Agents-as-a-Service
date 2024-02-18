import {derived, get, type Readable, type Writable, writable} from "svelte/store";
import {type SavedAgentSpecification} from "api-client";
import {authenticatedState} from "$lib/firebase";
import {AgentRepository} from "$lib/services/repositories";
import type {ApiValue} from "$lib/services/util";


export enum WorkshopTab {
    AGENTS, SKILLS, TASKS
}

class WorkshopState {
    tabStore: Writable<WorkshopTab> = writable(WorkshopTab.AGENTS);
    agentsStore: Readable<ApiValue<SavedAgentSpecification[]>>;


    constructor(agents: Readable<ApiValue<SavedAgentSpecification[]>>) {
        this.agentsStore = agents;
    }
}

export const activeTab: Writable<WorkshopTab> = writable(WorkshopTab.AGENTS);
export const agentsStore: Writable<ApiValue<SavedAgentSpecification[]>> = writable({value: [], isLoaded: false});
export const workshopStore: Readable<WorkshopState> = derived(
    authenticatedState, (user) => {
        const repository = new AgentRepository(user);
        return new WorkshopState(
            derived(repository.streamList(), (agents) => ({value: agents, isLoaded: true}))
        );
    }
);
export const agentsMapStore: Readable<ApiValue<Map<string, SavedAgentSpecification>>> = derived(
    agentsStore,
    (store) => {
        const map = new Map<string, SavedAgentSpecification>();
        for (const agent of store.value) {
            map.set(agent.id, agent);
        }
        return {value: map, isLoaded: store.isLoaded, error: store.error};
    }
);

export async function refreshWorkshop() {
    await Promise.all([
        refreshAgents(),
    ]);
}

export async function refreshAgents() {
    const agentRepository = new AgentRepository(get(authenticatedState));

    agentsStore.update((state) => ({...state, isLoaded: false}));
    try {
        const docs = await agentRepository.list();
        console.log("refreshAgents", docs);
        agentsStore.update((state) => ({...state, value: docs, isLoaded: true}));
    } catch (err) {
        agentsStore.update((state) => ({...state, error: err, isLoaded: true}));
    }
}



