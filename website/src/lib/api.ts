import {authState} from "$lib/firebase";
import {get} from "svelte/store";
import {
    createConfiguration, type Middleware, type RequestContext, type ResponseContext, servers,

    AgentApi,
    AuthApi,
    SessionApi, ServerConfiguration,
} from 'api-client';

class FirebaseAuthenticationMiddleware implements Middleware {
    async pre(context: RequestContext): Promise<RequestContext> {
        const {user} = get(authState);
        if (!user) return Promise.reject({details: "Not authenticated."});
        console.log("FirebaseAuthenticationMiddleware.pre.1", user.toJSON());
        const accessToken = await user?.getIdToken(true);
        console.log("FirebaseAuthenticationMiddleware.pre.2", accessToken);
        context.setHeaderParam("Authorization", `Bearer ${accessToken}`);
        console.log("FirebaseAuthenticationMiddleware.pre", context.getHttpMethod());
        return Promise.resolve(context);
    }

    post(context: ResponseContext): Promise<ResponseContext> {
        return Promise.resolve(context);
    }

}
// Create configuration parameter object
const configurationParameters = {
    baseServer: new ServerConfiguration<{  }>("/api", {  }),
    authMethods: {},

    promiseMiddleware: [new FirebaseAuthenticationMiddleware()],
}

const config = createConfiguration(configurationParameters);

export const agentApi = new AgentApi(config);
export const authApi = new AuthApi(config);
export const sessionApi = new SessionApi(config);
