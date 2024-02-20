import {derived, get, readable, type Readable, type Writable, writable} from "svelte/store";
import {type SavedAgentSpecification, SavedSkillSpecification, SkillSpecification} from "api-client";
import {authenticatedState} from "$lib/firebase";
import {AgentRepository, SkillRepository} from "$lib/services/repositories";
import type {ApiValue} from "$lib/services/util";
import {toast} from "svelte-sonner";
import type {User} from "firebase/auth";
import {skillsApi} from "$lib/api";


export enum WorkshopTab {
    AGENTS, SKILLS, TASKS
}

class WorkshopState {
    private user: User;
    tabStore: Writable<WorkshopTab> = writable(WorkshopTab.AGENTS);
    agentsStore: Readable<ApiValue<SavedAgentSpecification[]>>;
    skillsStore: Readable<ApiValue<SavedSkillSpecification[]>>;


    constructor(user: User, agents: Readable<ApiValue<SavedAgentSpecification[]>>, skills: Readable<ApiValue<SavedSkillSpecification[]>>) {
        this.user = user;
        this.agentsStore = agents;
        this.skillsStore = skills
    }


    setTab(tab: WorkshopTab) {
        this.tabStore.set(tab);
    }

    get agentsStoreAsMap(): Readable<ApiValue<Map<string, SavedAgentSpecification>>> {
        return derived(
            this.agentsStore,
            (store) => {
                const map = new Map<string, SavedAgentSpecification>();
                for (const agent of store.value) {
                    map.set(agent.id, agent);
                }
                return {value: map, isLoaded: store.isLoaded, error: store.error};
            }
        );
    }

    public async creteSkill(skill: SkillSpecification) {
        console.log('create skill');
        const promise = skillsApi.createSkillSkillsPost(skill);
        toast.promise(
            promise,
            {
                loading: "Creating skill...",
                success: "Skill created!",
                error: "Failed to create skill."
            }
        );
        return await promise;
    }
}

export const activeTab: Writable<WorkshopTab> = writable(WorkshopTab.AGENTS);
// export const agentsStore: Writable<ApiValue<SavedAgentSpecification[]>> = writable({value: [], isLoaded: false});
export const workshopStore: Readable<WorkshopState> = derived(
    authenticatedState, (user) => {
        const agents = new AgentRepository(user);
        const skills = new SkillRepository(user);
        return new WorkshopState(user,
            derived(agents.streamList(), (agents) => ({value: agents, isLoaded: true})),
            derived(skills.streamList(), (skills) => ({value: skills, isLoaded: true}))
        );
    }
);
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

