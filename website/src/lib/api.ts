import {authState} from "$lib/firebase";
import {get} from "svelte/store";
import {
    AgentApi,
    AuthApi,
    createConfiguration,
    type Middleware,
    type RequestContext,
    type ResponseContext,
    server1,
    SessionApi,
} from 'api-client';
import moment from "moment";

class FirebaseAuthenticationMiddleware implements Middleware {
    async pre(context: RequestContext): Promise<RequestContext> {
        const {user} = get(authState);
        if (!user) return Promise.reject({details: "Not authenticated."});
        let idTokenResult = await user?.getIdTokenResult();
        const expiry = moment(idTokenResult.expirationTime);
        const now = moment();

        if (expiry < now) {
            idTokenResult = await user?.getIdTokenResult(true);
        }
        context.setHeaderParam("Authorization", `Bearer ${idTokenResult.token}`);
        return Promise.resolve(context);
    }

    post(context: ResponseContext): Promise<ResponseContext> {
        return Promise.resolve(context);
    }

}

// Create configuration parameter object
const configurationParameters = {
    baseServer: server1,
    // baseServer: new ServerConfiguration<{  }>("/api", {  }),
    authMethods: {},

    promiseMiddleware: [new FirebaseAuthenticationMiddleware()],
}

const config = createConfiguration(configurationParameters);

export const agentApi = new AgentApi(config);
export const authApi = new AuthApi(config);
export const sessionApi = new SessionApi(config);
