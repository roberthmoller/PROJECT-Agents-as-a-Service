import {derived, get, readable, type Readable, type Writable, writable} from "svelte/store";
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
// export const agentsStore: Writable<ApiValue<SavedAgentSpecification[]>> = writable({value: [], isLoaded: false});
export const workshopStore: Readable<WorkshopState> = derived(
    authenticatedState, (user) => {
        const repository = new AgentRepository(user);
        return new WorkshopState(
            derived(repository.streamList(), (agents) => ({value: agents, isLoaded: true}))
        );
    }
);
export const agentsMapStore: Readable<ApiValue<Map<string, SavedAgentSpecification>>> = readable();
// export const agentsMapStore: Readable<ApiValue<Map<string, SavedAgentSpecification>>> = derived(
//     derived(workshopStore, (store) => store.agentsStore),
//     (store) => {
//         const map = new Map<string, SavedAgentSpecification>();
//         for (const agent of store.value) {
//             map.set(agent.id, agent);
//         }
//         return {value: map, isLoaded: store.isLoaded, error: store.error};
//     }
// );
//

