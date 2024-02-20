import {derived, get, type Readable, type Writable, writable} from "svelte/store";
import {
    MessageContentModel,
    SavedAgentSpecification,
    SavedMessageModel,
    SavedSessionSpecification,
    SessionSpecification
} from "restClient";
import {sessionApi} from "$lib/api";
import type {ApiValue} from "$lib/services/util";
import {MessagesRepository, SessionRepository} from "$lib/services/repositories";
import {authenticatedState} from "$lib/firebase";
import type {User} from "firebase/auth";
import {toast} from "svelte-sonner";
import moment from "moment";


export class ChatServiceState {
    private readonly user: User;
    activeSessionStore: Writable<ActiveSessionState | NoSessionState>;
    sessionsStore: Readable<ApiValue<SavedSessionSpecification[]>>;

    constructor(user: User) {
        const sessions = new SessionRepository(user);
        this.user = user;
        this.activeSessionStore = writable(new NoSessionState())
        this.sessionsStore = derived(
            sessions.streamList(),
            sessions => ({value: sessions, isLoaded: true}),
            {value: [], isLoaded: false}
        );
    }

    setActiveSession(session: SavedSessionSpecification) {
        this.activeSessionStore.set(new ActiveSessionState(this.user, session));
    }

    startNewSession() {
        this.activeSessionStore.set(new NoSessionState());
    }
}


export class ActiveSessionState {
    private readonly user: User;
    readonly session: SavedSessionSpecification;
    allMessagesStore: Readable<ApiValue<SavedMessageModel[]>>;
    inputStore: Writable<string> = writable("");

    constructor(user: User, session: SavedSessionSpecification) {
        this.user = user;
        this.session = session;
        const messages = new MessagesRepository(this.user, this.session.id);
        this.allMessagesStore = derived(
            messages.streamList(),
            messages => ({value: messages.sort(this.bySentAt), isLoaded: true}),
            {value: [], isLoaded: false}
        );
    }

    private bySentAt(a: SavedMessageModel, b: SavedMessageModel) {
        return moment(a.sentAt).valueOf() - moment(b.sentAt).valueOf();
    }

    get canSendMessage() {
        return derived(this.inputStore, message => message.length > 0);
    }

    async sendMessage() {
        const message = new MessageContentModel();
        message.content = get(this.inputStore);
        this.inputStore.set("");

        toast.promise(
            sessionApi.sendMessageSessionsSessionIdPost(this.session.id, message),
            {
                loading: "Sending message...",
                success: "Message sent!",
                error: "Failed to send message."
            }
        );
    }
}

export class NoSessionState {
    selectedAgents: Writable<SavedAgentSpecification[]> = writable([]);
    initialMessage: Writable<string> = writable("");
    isAgentPickerOpen: Writable<boolean> = writable(false);


    get hasSelectedAgents() {
        return derived(this.selectedAgents, agents => agents.length > 0);
    }

    get hasEnteredInitialMessage() {
        return derived(this.initialMessage, message => message.length > 0);
    }

    get canInstantiateSession() {
        return derived(
            [this.hasSelectedAgents, this.hasEnteredInitialMessage],
            ([agents, message]) => agents && message
        );
    }

    openAgentPicker() {
        this.isAgentPickerOpen.set(true);
    }

    closeAgentPicker() {
        this.isAgentPickerOpen.set(false);
    }

    hasSelectedAgent(agent: SavedAgentSpecification) {
        return derived(this.selectedAgents, agents => agents.find(a => a.id === agent.id) != null);
    }

    selectAgent(agent: SavedAgentSpecification) {
        const selected = get(this.selectedAgents);
        if (selected.find(a => a.id === agent.id) == null) {
            this.selectedAgents.update(agents => [...agents, agent]);
        } else {
            this.selectedAgents.update(agents => agents.filter(a => a.id !== agent.id));
        }
    }

    async createSession() {
        const spec = new SessionSpecification();
        spec.agents = get(this.selectedAgents).map(agent => agent.id);
        const session = await sessionApi.createSessionSessionsPost(spec);
        get(chatStore).setActiveSession(session);
        return session;
    }
}

export const chatStore: Readable<ChatServiceState> = derived(
    authenticatedState,
    (user) => new ChatServiceState(user)
);

// export const activeSessionStoreMessages = derived(
//     activeSession,
//     (store) => {
//         if (store == null) return readable<SavedMessageModel[]>([]);
//         const repo = new MessagesRepository(get(authenticatedState), store.id);
//         return derived(
//             repo.streamList(),
//             (messages) => messages.sort((a, b) => moment(a.sentAt).valueOf() - moment(b.sentAt).valueOf())
//         );
//     });

// export async function sendMessage(content: string) {
//     const session = get(activeSession);
//     if (session == null) return;
//     const message = new MessageContentModel();
//     message.content = content;
//     const update = await sessionApi.sendMessageSessionsSessionIdPost(session.id, message);
//     // activeSession.set(update);
// }

// export async function createSession(spec: SessionSpecification) {
//     const session = await sessionApi.createSessionSessionsPost(spec);
//     await refreshSessions();
//     return session;
// }