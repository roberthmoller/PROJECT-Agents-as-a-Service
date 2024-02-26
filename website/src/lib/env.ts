import {PUBLIC_ENVIRONMENT} from "$env/static/public"

export enum Env {
    LOCAL = "LOCAL",
    PROD = "PROD"
}

export namespace Env {
    export function of(value: string): Env {
        switch (value) {
            case "LOCAL":
                return Env.LOCAL;
            case "PROD":
                return Env.PROD;
            default:
                throw new Error(`Invalid value for Env: ${value}`);
        }
    }

    export function isLocal(env: Env): boolean {
        return env === Env.LOCAL;
    }
}

export const env = Env.of(PUBLIC_ENVIRONMENT);

