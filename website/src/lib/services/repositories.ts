import {
    collection,
    getDocs,
    doc,
    setDoc,
    onSnapshot,
    getDoc,
    deleteDoc,
    addDoc,
    type  DocumentData
} from "firebase/firestore";
import {db} from "$lib/firebase";
import {
    AgentSpecification,
    SavedAgentSpecification,
    SavedMessageModel,
    SavedSessionSpecification, SavedSkillSpecification,
    SessionSpecification, SkillSpecification
} from "api-client";
import type {User} from "firebase/auth";
import {type Readable, type Writable, writable} from "svelte/store";

abstract class Repository<SAVED, NEW> {
    abstract get collection(): string;

    abstract factory(doc: DocumentData): SAVED;

    public async list(): Promise<SAVED[]> {
        const docs = await getDocs(collection(db, this.collection));
        return docs.docs.map(this.factory);
    }

    public streamList(): Readable<SAVED[]> {
        return writable<SAVED[]>(
            [],
            (set) =>
                onSnapshot(
                    collection(db, this.collection),
                    (q) => set(q.empty ? [] : q.docs.map(this.factory))
                )
        );
    }

    public async get(id: string): Promise<SAVED> {
        const d = await getDoc(doc(db, this.collection, id));
        return this.factory(d);
    }

    public async create(data: NEW): Promise<SAVED> {
        const ref = await addDoc(collection(db, this.collection), Object.assign({}, data));
        const d = await getDoc(ref);
        return this.factory(d);
    }

    public async update(id: string, data: NEW): Promise<SAVED> {
        await setDoc(doc(db, this.collection, id), Object.assign({}, data));
        const d = await getDoc(doc(db, this.collection, id));
        return this.factory(d);
    }

    public async delete(id: string): Promise<void> {
        await deleteDoc(doc(db, this.collection, id));
    }
}


export class AgentRepository extends Repository<SavedAgentSpecification, AgentSpecification> {
    readonly user: User;
    readonly org: string;

    constructor(user: User, org?: string) {
        super();
        this.user = user;
        this.org = org ?? "public";
    }

    get collection(): string {
        return `v1/${this.org}/users/${this.user.uid}/agents`;
    }


    factory(doc: DocumentData): SavedAgentSpecification {
        const agent = new SavedAgentSpecification();
        const data = doc.data();
        agent.id = doc.id;
        agent.name = data.name;
        agent.systemMessage = data.system_message;
        agent.description = data.description ?? "";
        agent.models = data.models;
        agent.cacheSeed = data.cache_seed;
        agent.temperature = data.temperature;
        agent.createdAt = data.created_at ?? null;
        agent.updatedAt = data.updated_at ?? null;
        return agent;
    }
}


export class SessionRepository extends Repository<SavedSessionSpecification, SessionSpecification> {
    readonly user: User;
    readonly org: string;

    constructor(user: User, org?: string) {
        super();
        this.user = user;
        this.org = org ?? "public";
    }

    get collection(): string {
        return `v1/${this.org}/users/${this.user.uid}/sessions`;
    }


    factory(doc: DocumentData): SavedSessionSpecification {
        const session = new SavedSessionSpecification();
        const data = doc.data();
        session.id = doc.id;
        session.agents = data.agents;
        return session;
    }
}

export class MessagesRepository extends Repository<SavedMessageModel, String> {
    readonly user: User;
    readonly org: string;
    readonly session: string;

    constructor(user: User, session: string, org?: string) {
        super();
        this.user = user;
        this.session = session;
        this.org = org ?? "public";
    }

    get collection(): string {
        return `v1/${this.org}/users/${this.user.uid}/sessions/${this.session}/messages`;
    }


    factory(doc: DocumentData): SavedMessageModel {
        const message = new SavedMessageModel();
        const data = doc.data();
        message.id = doc.id;
        message.content = data.content;
        message.sender = data.sender;
        message.sentAt = data.sent_at;
        return message;
    }
}

export class SkillRepository extends Repository<SavedSkillSpecification, SkillSpecification> {
    readonly user: User;
    readonly org: string;

    constructor(user: User, org?: string) {
        super();
        this.user = user;
        this.org = org ?? "public";
    }

    get collection(): string {
        return `v1/${this.org}/users/${this.user.uid}/skills`;
    }


    factory(doc: DocumentData): SavedSkillSpecification {
        const skill = new SavedSkillSpecification();
        const data = doc.data();
        skill.id = doc.id;
        skill.name = data.name;
        skill.requirements = data.requirements;
        skill.description = data.description;
        skill.code = data.code;
        return skill;
    }
}
