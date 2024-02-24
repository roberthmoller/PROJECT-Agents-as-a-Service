import {derived, get, readable, type Readable, type Writable, writable} from "svelte/store";
import {
    SavedAgentSpecification,
    type AgentSpecification,
    SavedSkillSpecification,
    type SkillSpecification
} from "api-client";
import {authenticatedState} from "$lib/firebase";
import {AgentRepository, SkillRepository} from "$lib/services/repositories";
import type {ApiValue} from "$lib/services/util";
import {toast} from "svelte-sonner";
import type {User} from "firebase/auth";
import {agentApi, skillsApi} from "$lib/api";


export enum WorkshopTab {
    AGENTS, SKILLS, TASKS
}

class WorkshopState {
    tabStore: Writable<WorkshopTab> = writable(WorkshopTab.SKILLS);
    agentsStore: Readable<ApiValue<SavedAgentSpecification[]>>;
    skillsStore: Readable<ApiValue<SavedSkillSpecification[]>>;


    constructor(user: User) {
        const agents = new AgentRepository(user);
        const skills = new SkillRepository(user);
        this.agentsStore = derived(agents.streamList(), (agents) => ({value: agents, isLoaded: true}));
        this.skillsStore = derived(skills.streamList(), (skills) => ({value: skills, isLoaded: true}));
    }


    public setTab(tab: WorkshopTab) {
        this.tabStore.set(tab);
    }

    public get agentsStoreAsMap(): Readable<ApiValue<Map<string, SavedAgentSpecification>>> {
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

    public async createAgent(agent: AgentSpecification) {
        console.log('create agent');
        const promise = agentApi.createAgentAgentsPost(agent);
        toast.promise(
            promise,
            {
                loading: "Creating agent...",
                success: "Agent created!",
                error: "Failed to create agent."
            }
        );
        return await promise;
    }

    public async updateAgent(agent: SavedAgentSpecification) {
        console.log('update agent');
        const promise = agentApi.updateAgentAgentsAgentIdPut(agent.id, agent);
        toast.promise(
            promise,
            {
                loading: "Updating agent...",
                success: "Agent updated!",
                error: "Failed to update agent."
            }
        );
        return await promise;
    }


    public async deleteAgent(agent: SavedAgentSpecification) {
        console.log('delete agent');
        const promise = agentApi.deleteAgentAgentsAgentIdDelete(agent.id);
        toast.promise(
            promise,
            {
                loading: "Deleting agent...",
                success: "Agent deleted!",
                error: "Failed to delete agent."
            }
        );
        return await promise;
    }

    public async saveAgent(agent: SavedAgentSpecification | AgentSpecification) {
        if (agent instanceof SavedAgentSpecification) {
            return this.updateAgent(agent);
        } else {
            return this.createAgent(agent);
        }
    }

    public async createSkill(skill: SkillSpecification) {
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

    public async updateSkill(skill: SavedSkillSpecification) {
        console.log('update skill');
        const promise = skillsApi.updateSkillSkillsSkillIdPut(skill.id, skill);
        toast.promise(
            promise,
            {
                loading: "Updating skill...",
                success: "Skill updated!",
                error: "Failed to update skill."
            }
        );
        return await promise;
    }

    public async deleteSkill(skill: SavedSkillSpecification) {
        console.log('delete skill');
        const promise = skillsApi.deleteSkillSkillsSkillIdDelete(skill.id);
        toast.promise(
            promise,
            {
                loading: "Deleting skill...",
                success: "Skill deleted!",
                error: "Failed to delete skill."
            }
        );
        return await promise;
    }

    public async saveSkill(skill: SavedSkillSpecification | SkillSpecification) {
        if (skill instanceof SavedSkillSpecification) {
            return this.updateSkill(skill);
        } else {
            return this.createSkill(skill);
        }
    }
}

export const activeTab: Writable<WorkshopTab> = writable(WorkshopTab.AGENTS);
export const workshopStore: Readable<WorkshopState> = derived(authenticatedState, (user) => new WorkshopState(user));
