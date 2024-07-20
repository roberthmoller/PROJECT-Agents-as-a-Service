import {ModelConnection, ModelProviderConnection, SavedApiKey} from "api-client";
import {derived, readable, type Readable, writable} from "svelte/store";
import type {User} from "firebase/auth";
import {authenticatedState} from "$lib/firebase";
import {providersApi} from "$lib/api";
import {toast} from "svelte-sonner";
import {ProviderRepository} from "$lib/services/repositories";

export class ProviderService {
    providers: Readable<ModelProviderConnection[]>;

    constructor(user: User) {
        const repo = new ProviderRepository(user);
        this.providers = derived(repo.streamList(), (_, set) => {
            providersApi.listProvidersProvidersGet().then((values) => set(values));
        }, []);
    }

    async connectProvider(name: string, apiKey: string) {
        const connection = new ModelConnection();
        connection.apiKey = apiKey;

        const promise = providersApi.connectProviderProvidersProviderPost(name, connection);
        toast.promise(
            promise, {
                loading: "Connecting provider...",
                success: "Provider connected.",
                error: "Failed to connect provider."
            }
        );
        return promise;
    }

    disconnectProvider(name: string) {
        const promise = providersApi.disconnectProviderProvidersProviderDelete(name);
        toast.promise(
            promise, {
                loading: "Disconnecting provider...",
                success: "Provider disconnected.",
                error: "Failed to disconnect provider."
            }
        );
        return promise;
    }
}

export let providerService = derived(authenticatedState, (user) => new ProviderService(user));