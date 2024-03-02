import {ApiKey,  SecretApiKey, SavedApiKey} from "api-client";
import {derived, type Readable} from "svelte/store";
import type {User} from "firebase/auth";
import {ApiKeyRepository} from "$lib/services";
import {authenticatedState} from "$lib/firebase";
import {authApi} from "$lib/api";
import {toast} from "svelte-sonner";

export class ApiKeysState {
    keys: Readable<SavedApiKey[]>;

    constructor(user: User) {
        const repo = new ApiKeyRepository(user);
        this.keys = repo.streamList();
    }

    async createApiKey(name: string) {
        const createKey = new ApiKey();
        createKey.name = name;
        const promise = authApi.createApiKeyAuthApiKeyPost(createKey);
        toast.promise(
            promise, {
                loading: "Creating API Key...",
                success: "API Key created.",
                error: "Failed to create API Key."
            }
        );
        return await promise;
        // todo: Show dialog with the key
        // todo: Change key generation to be sk = `sk-hash(uid, random, salt)` and store `hash(sk, salt)` in the database
        // todo: Change key verification to be `hash(sk-hash(uid, key, salt))`
    }

    deleteApiKey(key: SavedApiKey) {
        console.log("Deleting API Key", key.id)
        toast.promise(
            authApi.deleteApiKeyAuthApiKeyKeyIdDelete(key.id), {
                loading: "Deleting API Key...",
                success: "API Key deleted.",
                error: "Failed to delete API Key."
            }
        );
    }
}

export let apiKeysState = derived(authenticatedState, (user) => new ApiKeysState(user));