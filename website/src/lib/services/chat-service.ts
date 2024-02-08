import {derived, get, readable, writable} from "svelte/store";
import {SavedAgentSpecification, SavedSessionSpecification, Session, SessionSpecification} from "restClient";
import {agentApi, sessionApi} from "$lib/api";

export const sessions = writable<Session[]>([], (set) => {
    listSessions().then(set);
});



export async function listSessions(): Promise<Session[]> {
    return await sessionApi.listSessionsSessionsGet();
}



export async function listAgents(): Promise<SavedAgentSpecification[]> {
    return await agentApi.listAgentsAgentsGet();
}

export const agentStore = readable<SavedAgentSpecification[]>([], (set) => {
    listAgents().then(set);
});


export const activeSession = writable<Session | null>(null);

export async function sendMessage(message: string) {
    const session = get(activeSession);
    if (session == null) return;

    const update = await sessionApi.sendMessageSessionSessionIdPost(session.id, message);
    activeSession.set(update);
}