import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
import { AgentSpecification } from '../models/AgentSpecification';
import { ApiKey } from '../models/ApiKey';
import { Code } from '../models/Code';
import { FirebaseUser } from '../models/FirebaseUser';
import { GroqLlmModel } from '../models/GroqLlmModel';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { LocalLlmModel } from '../models/LocalLlmModel';
import { MessageContentModel } from '../models/MessageContentModel';
import { ModelConnection } from '../models/ModelConnection';
import { ModelProviderConnection } from '../models/ModelProviderConnection';
import { Name } from '../models/Name';
import { OpenAILlmModel } from '../models/OpenAILlmModel';
import { PhoneNumber } from '../models/PhoneNumber';
import { PhotoUrl } from '../models/PhotoUrl';
import { Requirements } from '../models/Requirements';
import { Role } from '../models/Role';
import { SavedAgentSpecification } from '../models/SavedAgentSpecification';
import { SavedApiKey } from '../models/SavedApiKey';
import { SavedMessageModel } from '../models/SavedMessageModel';
import { SavedSessionSpecification } from '../models/SavedSessionSpecification';
import { SavedSkillSpecification } from '../models/SavedSkillSpecification';
import { SecretApiKey } from '../models/SecretApiKey';
import { Session } from '../models/Session';
import { SessionSpecification } from '../models/SessionSpecification';
import { SkillSpecification } from '../models/SkillSpecification';
import { ValidationError } from '../models/ValidationError';

import { AgentApiRequestFactory, AgentApiResponseProcessor} from "../apis/AgentApi";
export class ObservableAgentApi {
    private requestFactory: AgentApiRequestFactory;
    private responseProcessor: AgentApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: AgentApiRequestFactory,
        responseProcessor?: AgentApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AgentApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AgentApiResponseProcessor();
    }

    /**
     * Create a new agent
     * Create Agent
     * @param agentSpecification 
     */
    public createAgentAgentsPostWithHttpInfo(agentSpecification: AgentSpecification, _options?: Configuration): Observable<HttpInfo<SavedAgentSpecification>> {
        const requestContextPromise = this.requestFactory.createAgentAgentsPost(agentSpecification, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createAgentAgentsPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create a new agent
     * Create Agent
     * @param agentSpecification 
     */
    public createAgentAgentsPost(agentSpecification: AgentSpecification, _options?: Configuration): Observable<SavedAgentSpecification> {
        return this.createAgentAgentsPostWithHttpInfo(agentSpecification, _options).pipe(map((apiResponse: HttpInfo<SavedAgentSpecification>) => apiResponse.data));
    }

    /**
     * Delete a specific agent by its ID
     * Delete Agent
     * @param agentId 
     */
    public deleteAgentAgentsAgentIdDeleteWithHttpInfo(agentId: string, _options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.deleteAgentAgentsAgentIdDelete(agentId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteAgentAgentsAgentIdDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete a specific agent by its ID
     * Delete Agent
     * @param agentId 
     */
    public deleteAgentAgentsAgentIdDelete(agentId: string, _options?: Configuration): Observable<any> {
        return this.deleteAgentAgentsAgentIdDeleteWithHttpInfo(agentId, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Get a specific agent by its ID
     * Get Agent
     * @param agentId 
     */
    public getAgentAgentsAgentIdGetWithHttpInfo(agentId: string, _options?: Configuration): Observable<HttpInfo<SavedAgentSpecification>> {
        const requestContextPromise = this.requestFactory.getAgentAgentsAgentIdGet(agentId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAgentAgentsAgentIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get a specific agent by its ID
     * Get Agent
     * @param agentId 
     */
    public getAgentAgentsAgentIdGet(agentId: string, _options?: Configuration): Observable<SavedAgentSpecification> {
        return this.getAgentAgentsAgentIdGetWithHttpInfo(agentId, _options).pipe(map((apiResponse: HttpInfo<SavedAgentSpecification>) => apiResponse.data));
    }

    /**
     * List all agents you have access to
     * List Agents
     */
    public listAgentsAgentsGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<Array<SavedAgentSpecification>>> {
        const requestContextPromise = this.requestFactory.listAgentsAgentsGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.listAgentsAgentsGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * List all agents you have access to
     * List Agents
     */
    public listAgentsAgentsGet(_options?: Configuration): Observable<Array<SavedAgentSpecification>> {
        return this.listAgentsAgentsGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<SavedAgentSpecification>>) => apiResponse.data));
    }

    /**
     * Update a specific agent by its ID
     * Update Agent
     * @param agentId 
     * @param agentSpecification 
     */
    public updateAgentAgentsAgentIdPutWithHttpInfo(agentId: string, agentSpecification: AgentSpecification, _options?: Configuration): Observable<HttpInfo<SavedAgentSpecification>> {
        const requestContextPromise = this.requestFactory.updateAgentAgentsAgentIdPut(agentId, agentSpecification, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateAgentAgentsAgentIdPutWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update a specific agent by its ID
     * Update Agent
     * @param agentId 
     * @param agentSpecification 
     */
    public updateAgentAgentsAgentIdPut(agentId: string, agentSpecification: AgentSpecification, _options?: Configuration): Observable<SavedAgentSpecification> {
        return this.updateAgentAgentsAgentIdPutWithHttpInfo(agentId, agentSpecification, _options).pipe(map((apiResponse: HttpInfo<SavedAgentSpecification>) => apiResponse.data));
    }

}

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class ObservableAuthApi {
    private requestFactory: AuthApiRequestFactory;
    private responseProcessor: AuthApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AuthApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AuthApiResponseProcessor();
    }

    /**
     * Create Api Key
     * @param apiKey 
     */
    public createApiKeyAuthApiKeyPostWithHttpInfo(apiKey: ApiKey, _options?: Configuration): Observable<HttpInfo<SecretApiKey>> {
        const requestContextPromise = this.requestFactory.createApiKeyAuthApiKeyPost(apiKey, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createApiKeyAuthApiKeyPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create Api Key
     * @param apiKey 
     */
    public createApiKeyAuthApiKeyPost(apiKey: ApiKey, _options?: Configuration): Observable<SecretApiKey> {
        return this.createApiKeyAuthApiKeyPostWithHttpInfo(apiKey, _options).pipe(map((apiResponse: HttpInfo<SecretApiKey>) => apiResponse.data));
    }

    /**
     * Delete Api Key
     * @param keyId 
     */
    public deleteApiKeyAuthApiKeyKeyIdDeleteWithHttpInfo(keyId: string, _options?: Configuration): Observable<HttpInfo<string>> {
        const requestContextPromise = this.requestFactory.deleteApiKeyAuthApiKeyKeyIdDelete(keyId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteApiKeyAuthApiKeyKeyIdDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete Api Key
     * @param keyId 
     */
    public deleteApiKeyAuthApiKeyKeyIdDelete(keyId: string, _options?: Configuration): Observable<string> {
        return this.deleteApiKeyAuthApiKeyKeyIdDeleteWithHttpInfo(keyId, _options).pipe(map((apiResponse: HttpInfo<string>) => apiResponse.data));
    }

    /**
     * Get Api Key
     * @param keyId 
     */
    public getApiKeyAuthApiKeyKeyIdGetWithHttpInfo(keyId: string, _options?: Configuration): Observable<HttpInfo<SavedApiKey>> {
        const requestContextPromise = this.requestFactory.getApiKeyAuthApiKeyKeyIdGet(keyId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getApiKeyAuthApiKeyKeyIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Api Key
     * @param keyId 
     */
    public getApiKeyAuthApiKeyKeyIdGet(keyId: string, _options?: Configuration): Observable<SavedApiKey> {
        return this.getApiKeyAuthApiKeyKeyIdGetWithHttpInfo(keyId, _options).pipe(map((apiResponse: HttpInfo<SavedApiKey>) => apiResponse.data));
    }

    /**
     * Get Authenticated User
     */
    public getAuthenticatedUserAuthGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<FirebaseUser>> {
        const requestContextPromise = this.requestFactory.getAuthenticatedUserAuthGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAuthenticatedUserAuthGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Authenticated User
     */
    public getAuthenticatedUserAuthGet(_options?: Configuration): Observable<FirebaseUser> {
        return this.getAuthenticatedUserAuthGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<FirebaseUser>) => apiResponse.data));
    }

}

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class ObservableDefaultApi {
    private requestFactory: DefaultApiRequestFactory;
    private responseProcessor: DefaultApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new DefaultApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new DefaultApiResponseProcessor();
    }

    /**
     * Get Env
     */
    public getEnvEnvGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.getEnvEnvGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getEnvEnvGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Env
     */
    public getEnvEnvGet(_options?: Configuration): Observable<any> {
        return this.getEnvEnvGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

}

import { ProvidersApiRequestFactory, ProvidersApiResponseProcessor} from "../apis/ProvidersApi";
export class ObservableProvidersApi {
    private requestFactory: ProvidersApiRequestFactory;
    private responseProcessor: ProvidersApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: ProvidersApiRequestFactory,
        responseProcessor?: ProvidersApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new ProvidersApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new ProvidersApiResponseProcessor();
    }

    /**
     * Connect Provider
     * @param provider 
     * @param modelConnection 
     */
    public connectProviderProvidersProviderPostWithHttpInfo(provider: any, modelConnection: ModelConnection, _options?: Configuration): Observable<HttpInfo<ModelProviderConnection>> {
        const requestContextPromise = this.requestFactory.connectProviderProvidersProviderPost(provider, modelConnection, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.connectProviderProvidersProviderPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Connect Provider
     * @param provider 
     * @param modelConnection 
     */
    public connectProviderProvidersProviderPost(provider: any, modelConnection: ModelConnection, _options?: Configuration): Observable<ModelProviderConnection> {
        return this.connectProviderProvidersProviderPostWithHttpInfo(provider, modelConnection, _options).pipe(map((apiResponse: HttpInfo<ModelProviderConnection>) => apiResponse.data));
    }

    /**
     * Disconnect Provider
     * @param provider 
     */
    public disconnectProviderProvidersProviderDeleteWithHttpInfo(provider: any, _options?: Configuration): Observable<HttpInfo<ModelProviderConnection>> {
        const requestContextPromise = this.requestFactory.disconnectProviderProvidersProviderDelete(provider, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.disconnectProviderProvidersProviderDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * Disconnect Provider
     * @param provider 
     */
    public disconnectProviderProvidersProviderDelete(provider: any, _options?: Configuration): Observable<ModelProviderConnection> {
        return this.disconnectProviderProvidersProviderDeleteWithHttpInfo(provider, _options).pipe(map((apiResponse: HttpInfo<ModelProviderConnection>) => apiResponse.data));
    }

    /**
     * Get Provider
     * @param provider 
     */
    public getProviderProvidersProviderGetWithHttpInfo(provider: any, _options?: Configuration): Observable<HttpInfo<ModelProviderConnection>> {
        const requestContextPromise = this.requestFactory.getProviderProvidersProviderGet(provider, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getProviderProvidersProviderGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Provider
     * @param provider 
     */
    public getProviderProvidersProviderGet(provider: any, _options?: Configuration): Observable<ModelProviderConnection> {
        return this.getProviderProvidersProviderGetWithHttpInfo(provider, _options).pipe(map((apiResponse: HttpInfo<ModelProviderConnection>) => apiResponse.data));
    }

    /**
     * List Providers
     */
    public listProvidersProvidersGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.listProvidersProvidersGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.listProvidersProvidersGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * List Providers
     */
    public listProvidersProvidersGet(_options?: Configuration): Observable<any> {
        return this.listProvidersProvidersGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Options
     */
    public optionsProvidersOptionsWithHttpInfo(_options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.optionsProvidersOptions(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.optionsProvidersOptionsWithHttpInfo(rsp)));
            }));
    }

    /**
     * Options
     */
    public optionsProvidersOptions(_options?: Configuration): Observable<any> {
        return this.optionsProvidersOptionsWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Options
     * @param provider 
     */
    public optionsProvidersProviderOptionsWithHttpInfo(provider: any, _options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.optionsProvidersProviderOptions(provider, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.optionsProvidersProviderOptionsWithHttpInfo(rsp)));
            }));
    }

    /**
     * Options
     * @param provider 
     */
    public optionsProvidersProviderOptions(provider: any, _options?: Configuration): Observable<any> {
        return this.optionsProvidersProviderOptionsWithHttpInfo(provider, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

}

import { SessionApiRequestFactory, SessionApiResponseProcessor} from "../apis/SessionApi";
export class ObservableSessionApi {
    private requestFactory: SessionApiRequestFactory;
    private responseProcessor: SessionApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: SessionApiRequestFactory,
        responseProcessor?: SessionApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new SessionApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new SessionApiResponseProcessor();
    }

    /**
     * Create Session
     * @param sessionSpecification 
     */
    public createSessionSessionsPostWithHttpInfo(sessionSpecification: SessionSpecification, _options?: Configuration): Observable<HttpInfo<SavedSessionSpecification>> {
        const requestContextPromise = this.requestFactory.createSessionSessionsPost(sessionSpecification, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createSessionSessionsPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create Session
     * @param sessionSpecification 
     */
    public createSessionSessionsPost(sessionSpecification: SessionSpecification, _options?: Configuration): Observable<SavedSessionSpecification> {
        return this.createSessionSessionsPostWithHttpInfo(sessionSpecification, _options).pipe(map((apiResponse: HttpInfo<SavedSessionSpecification>) => apiResponse.data));
    }

    /**
     * Get Summary
     * @param sessionId 
     */
    public getSummarySessionsSessionIdGetWithHttpInfo(sessionId: any, _options?: Configuration): Observable<HttpInfo<Session>> {
        const requestContextPromise = this.requestFactory.getSummarySessionsSessionIdGet(sessionId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getSummarySessionsSessionIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Summary
     * @param sessionId 
     */
    public getSummarySessionsSessionIdGet(sessionId: any, _options?: Configuration): Observable<Session> {
        return this.getSummarySessionsSessionIdGetWithHttpInfo(sessionId, _options).pipe(map((apiResponse: HttpInfo<Session>) => apiResponse.data));
    }

    /**
     * List Sessions
     */
    public listSessionsSessionsGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.listSessionsSessionsGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.listSessionsSessionsGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * List Sessions
     */
    public listSessionsSessionsGet(_options?: Configuration): Observable<any> {
        return this.listSessionsSessionsGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Send Message
     * @param sessionId 
     * @param messageContentModel 
     */
    public sendMessageSessionsSessionIdPostWithHttpInfo(sessionId: any, messageContentModel: MessageContentModel, _options?: Configuration): Observable<HttpInfo<Session>> {
        const requestContextPromise = this.requestFactory.sendMessageSessionsSessionIdPost(sessionId, messageContentModel, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.sendMessageSessionsSessionIdPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Send Message
     * @param sessionId 
     * @param messageContentModel 
     */
    public sendMessageSessionsSessionIdPost(sessionId: any, messageContentModel: MessageContentModel, _options?: Configuration): Observable<Session> {
        return this.sendMessageSessionsSessionIdPostWithHttpInfo(sessionId, messageContentModel, _options).pipe(map((apiResponse: HttpInfo<Session>) => apiResponse.data));
    }

}

import { SkillsApiRequestFactory, SkillsApiResponseProcessor} from "../apis/SkillsApi";
export class ObservableSkillsApi {
    private requestFactory: SkillsApiRequestFactory;
    private responseProcessor: SkillsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: SkillsApiRequestFactory,
        responseProcessor?: SkillsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new SkillsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new SkillsApiResponseProcessor();
    }

    /**
     * Call Skill
     * @param skillId 
     * @param method 
     * @param body 
     */
    public callSkillSkillsSkillIdPostWithHttpInfo(skillId: string, method: string, body: any, _options?: Configuration): Observable<HttpInfo<string>> {
        const requestContextPromise = this.requestFactory.callSkillSkillsSkillIdPost(skillId, method, body, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.callSkillSkillsSkillIdPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Call Skill
     * @param skillId 
     * @param method 
     * @param body 
     */
    public callSkillSkillsSkillIdPost(skillId: string, method: string, body: any, _options?: Configuration): Observable<string> {
        return this.callSkillSkillsSkillIdPostWithHttpInfo(skillId, method, body, _options).pipe(map((apiResponse: HttpInfo<string>) => apiResponse.data));
    }

    /**
     * Create a new skill
     * Create Skill
     * @param skillSpecification 
     */
    public createSkillSkillsPostWithHttpInfo(skillSpecification: SkillSpecification, _options?: Configuration): Observable<HttpInfo<SavedSkillSpecification>> {
        const requestContextPromise = this.requestFactory.createSkillSkillsPost(skillSpecification, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createSkillSkillsPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create a new skill
     * Create Skill
     * @param skillSpecification 
     */
    public createSkillSkillsPost(skillSpecification: SkillSpecification, _options?: Configuration): Observable<SavedSkillSpecification> {
        return this.createSkillSkillsPostWithHttpInfo(skillSpecification, _options).pipe(map((apiResponse: HttpInfo<SavedSkillSpecification>) => apiResponse.data));
    }

    /**
     * Delete a specific skill by its ID
     * Delete Skill
     * @param skillId 
     */
    public deleteSkillSkillsSkillIdDeleteWithHttpInfo(skillId: string, _options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.deleteSkillSkillsSkillIdDelete(skillId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteSkillSkillsSkillIdDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete a specific skill by its ID
     * Delete Skill
     * @param skillId 
     */
    public deleteSkillSkillsSkillIdDelete(skillId: string, _options?: Configuration): Observable<any> {
        return this.deleteSkillSkillsSkillIdDeleteWithHttpInfo(skillId, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Get a specific agent by its ID
     * Get Skill
     * @param skillId 
     */
    public getSkillSkillsSkillIdGetWithHttpInfo(skillId: string, _options?: Configuration): Observable<HttpInfo<SavedSkillSpecification>> {
        const requestContextPromise = this.requestFactory.getSkillSkillsSkillIdGet(skillId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getSkillSkillsSkillIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get a specific agent by its ID
     * Get Skill
     * @param skillId 
     */
    public getSkillSkillsSkillIdGet(skillId: string, _options?: Configuration): Observable<SavedSkillSpecification> {
        return this.getSkillSkillsSkillIdGetWithHttpInfo(skillId, _options).pipe(map((apiResponse: HttpInfo<SavedSkillSpecification>) => apiResponse.data));
    }

    /**
     * List all skills you have access to
     * List Skills
     */
    public listSkillsSkillsGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<Array<SavedSkillSpecification>>> {
        const requestContextPromise = this.requestFactory.listSkillsSkillsGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.listSkillsSkillsGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * List all skills you have access to
     * List Skills
     */
    public listSkillsSkillsGet(_options?: Configuration): Observable<Array<SavedSkillSpecification>> {
        return this.listSkillsSkillsGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<SavedSkillSpecification>>) => apiResponse.data));
    }

    /**
     * Create a new skill
     * Skill Requirements
     * @param code 
     */
    public skillRequirementsSkillsRequirementsPostWithHttpInfo(code: Code, _options?: Configuration): Observable<HttpInfo<Requirements>> {
        const requestContextPromise = this.requestFactory.skillRequirementsSkillsRequirementsPost(code, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.skillRequirementsSkillsRequirementsPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create a new skill
     * Skill Requirements
     * @param code 
     */
    public skillRequirementsSkillsRequirementsPost(code: Code, _options?: Configuration): Observable<Requirements> {
        return this.skillRequirementsSkillsRequirementsPostWithHttpInfo(code, _options).pipe(map((apiResponse: HttpInfo<Requirements>) => apiResponse.data));
    }

    /**
     * Update a specific skill by its ID
     * Update Skill
     * @param skillId 
     * @param skillSpecification 
     */
    public updateSkillSkillsSkillIdPutWithHttpInfo(skillId: string, skillSpecification: SkillSpecification, _options?: Configuration): Observable<HttpInfo<SavedSkillSpecification>> {
        const requestContextPromise = this.requestFactory.updateSkillSkillsSkillIdPut(skillId, skillSpecification, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateSkillSkillsSkillIdPutWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update a specific skill by its ID
     * Update Skill
     * @param skillId 
     * @param skillSpecification 
     */
    public updateSkillSkillsSkillIdPut(skillId: string, skillSpecification: SkillSpecification, _options?: Configuration): Observable<SavedSkillSpecification> {
        return this.updateSkillSkillsSkillIdPutWithHttpInfo(skillId, skillSpecification, _options).pipe(map((apiResponse: HttpInfo<SavedSkillSpecification>) => apiResponse.data));
    }

}
