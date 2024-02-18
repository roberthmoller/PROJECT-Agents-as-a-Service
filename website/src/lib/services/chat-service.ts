import {derived, get, readable, writable} from "svelte/store";
import {
    MessageContentModel,
    SavedAgentSpecification, SavedMessageModel,
    SavedSessionSpecification,
    Session,
    SessionSpecification
} from "restClient";
import {agentApi, sessionApi} from "$lib/api";
import type {ApiValue} from "$lib/services/util";
import {MessagesRepository, SessionRepository} from "$lib/services/repositories";
import {authenticatedState} from "$lib/firebase";
import moment from "moment";


export const sessionsStore = writable<ApiValue<SavedSessionSpecification[]>>({value: [], isLoaded: false});


export async function refreshSessions() {
    sessionsStore.update((state) => ({...state, isLoaded: false}));
    try {
        const repository = new SessionRepository(get(authenticatedState));
        const sessions = await repository.list();
        sessionsStore.set({value: sessions, isLoaded: true});
    } catch (err) {
        sessionsStore.set({value: [], isLoaded: true, error: err});
    }

}

export const activeSession = writable<SavedSessionSpecification | null>(null);


export const activeSessionMessages = derived(
    activeSession,
    (store) => {
        if (store == null) return readable<SavedMessageModel[]>([]);
        const repo = new MessagesRepository(get(authenticatedState), store.id);
        return derived(
            repo.streamList(),
            (messages) => messages.sort((a, b) => moment(a.sentAt).valueOf() - moment(b.sentAt).valueOf())
        );
    });

export async function sendMessage(content: string) {
    const session = get(activeSession);
    if (session == null) return;
    const message = new MessageContentModel();
    message.content = content;
    const update = await sessionApi.sendMessageSessionsSessionIdPost(session.id, message);
    // activeSession.set(update);
}

export async function createSession(spec: SessionSpecification) {
    const session = await sessionApi.createSessionSessionsPost(spec);
    await refreshSessions();
    return session;
}