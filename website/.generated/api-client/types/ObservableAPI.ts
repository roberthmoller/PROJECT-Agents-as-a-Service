import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
import { AgentSpecification } from '../models/AgentSpecification';
import { FirebaseUser } from '../models/FirebaseUser';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { SavedAgentSpecification } from '../models/SavedAgentSpecification';
import { SavedMessageModel } from '../models/SavedMessageModel';
import { SavedSessionSpecification } from '../models/SavedSessionSpecification';
import { Session } from '../models/Session';
import { SessionSpecification } from '../models/SessionSpecification';
import { ValidationError } from '../models/ValidationError';
import { ValidationErrorLocInner } from '../models/ValidationErrorLocInner';

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
     * Create Agent
     * @param agentSpecification 
     */
    public createAgentAgentPostWithHttpInfo(agentSpecification: AgentSpecification, _options?: Configuration): Observable<HttpInfo<SavedAgentSpecification>> {
        const requestContextPromise = this.requestFactory.createAgentAgentPost(agentSpecification, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createAgentAgentPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create Agent
     * @param agentSpecification 
     */
    public createAgentAgentPost(agentSpecification: AgentSpecification, _options?: Configuration): Observable<SavedAgentSpecification> {
        return this.createAgentAgentPostWithHttpInfo(agentSpecification, _options).pipe(map((apiResponse: HttpInfo<SavedAgentSpecification>) => apiResponse.data));
    }

    /**
     * Delete Agent
     * @param agentId 
     */
    public deleteAgentAgentAgentIdDeleteWithHttpInfo(agentId: string, _options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.deleteAgentAgentAgentIdDelete(agentId, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteAgentAgentAgentIdDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete Agent
     * @param agentId 
     */
    public deleteAgentAgentAgentIdDelete(agentId: string, _options?: Configuration): Observable<any> {
        return this.deleteAgentAgentAgentIdDeleteWithHttpInfo(agentId, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Get a specific agent by its ID
     * Get Agent
     * @param agentId 
     */
    public getAgentAgentAgentIdGetWithHttpInfo(agentId: string, _options?: Configuration): Observable<HttpInfo<SavedAgentSpecification>> {
        const requestContextPromise = this.requestFactory.getAgentAgentAgentIdGet(agentId, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAgentAgentAgentIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get a specific agent by its ID
     * Get Agent
     * @param agentId 
     */
    public getAgentAgentAgentIdGet(agentId: string, _options?: Configuration): Observable<SavedAgentSpecification> {
        return this.getAgentAgentAgentIdGetWithHttpInfo(agentId, _options).pipe(map((apiResponse: HttpInfo<SavedAgentSpecification>) => apiResponse.data));
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
     * Update Agent
     * @param agentId 
     * @param agentSpecification 
     */
    public updateAgentAgentAgentIdPutWithHttpInfo(agentId: string, agentSpecification: AgentSpecification, _options?: Configuration): Observable<HttpInfo<SavedAgentSpecification>> {
        const requestContextPromise = this.requestFactory.updateAgentAgentAgentIdPut(agentId, agentSpecification, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateAgentAgentAgentIdPutWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update Agent
     * @param agentId 
     * @param agentSpecification 
     */
    public updateAgentAgentAgentIdPut(agentId: string, agentSpecification: AgentSpecification, _options?: Configuration): Observable<SavedAgentSpecification> {
        return this.updateAgentAgentAgentIdPutWithHttpInfo(agentId, agentSpecification, _options).pipe(map((apiResponse: HttpInfo<SavedAgentSpecification>) => apiResponse.data));
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
     * Create Access Token
     */
    public createAccessTokenAuthPostWithHttpInfo(_options?: Configuration): Observable<HttpInfo<string>> {
        const requestContextPromise = this.requestFactory.createAccessTokenAuthPost(_options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createAccessTokenAuthPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create Access Token
     */
    public createAccessTokenAuthPost(_options?: Configuration): Observable<string> {
        return this.createAccessTokenAuthPostWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<string>) => apiResponse.data));
    }

    /**
     * Delete Scopes
     * @param requestBody 
     */
    public deleteScopesAuthScopesDeleteWithHttpInfo(requestBody: Array<string>, _options?: Configuration): Observable<HttpInfo<Array<string>>> {
        const requestContextPromise = this.requestFactory.deleteScopesAuthScopesDelete(requestBody, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteScopesAuthScopesDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete Scopes
     * @param requestBody 
     */
    public deleteScopesAuthScopesDelete(requestBody: Array<string>, _options?: Configuration): Observable<Array<string>> {
        return this.deleteScopesAuthScopesDeleteWithHttpInfo(requestBody, _options).pipe(map((apiResponse: HttpInfo<Array<string>>) => apiResponse.data));
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

    /**
     * Get Scopes
     */
    public getScopesAuthScopesGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<Array<string>>> {
        const requestContextPromise = this.requestFactory.getScopesAuthScopesGet(_options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getScopesAuthScopesGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Scopes
     */
    public getScopesAuthScopesGet(_options?: Configuration): Observable<Array<string>> {
        return this.getScopesAuthScopesGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<string>>) => apiResponse.data));
    }

    /**
     * Grant Scopes
     * @param requestBody 
     */
    public grantScopesAuthScopesPutWithHttpInfo(requestBody: Array<string>, _options?: Configuration): Observable<HttpInfo<Array<string>>> {
        const requestContextPromise = this.requestFactory.grantScopesAuthScopesPut(requestBody, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.grantScopesAuthScopesPutWithHttpInfo(rsp)));
            }));
    }

    /**
     * Grant Scopes
     * @param requestBody 
     */
    public grantScopesAuthScopesPut(requestBody: Array<string>, _options?: Configuration): Observable<Array<string>> {
        return this.grantScopesAuthScopesPutWithHttpInfo(requestBody, _options).pipe(map((apiResponse: HttpInfo<Array<string>>) => apiResponse.data));
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
    public createSessionSessionPostWithHttpInfo(sessionSpecification: SessionSpecification, _options?: Configuration): Observable<HttpInfo<SavedSessionSpecification>> {
        const requestContextPromise = this.requestFactory.createSessionSessionPost(sessionSpecification, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createSessionSessionPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create Session
     * @param sessionSpecification 
     */
    public createSessionSessionPost(sessionSpecification: SessionSpecification, _options?: Configuration): Observable<SavedSessionSpecification> {
        return this.createSessionSessionPostWithHttpInfo(sessionSpecification, _options).pipe(map((apiResponse: HttpInfo<SavedSessionSpecification>) => apiResponse.data));
    }

    /**
     * Get Summary
     * @param sessionId 
     */
    public getSummarySessionSessionIdGetWithHttpInfo(sessionId: string, _options?: Configuration): Observable<HttpInfo<Session>> {
        const requestContextPromise = this.requestFactory.getSummarySessionSessionIdGet(sessionId, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getSummarySessionSessionIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Summary
     * @param sessionId 
     */
    public getSummarySessionSessionIdGet(sessionId: string, _options?: Configuration): Observable<Session> {
        return this.getSummarySessionSessionIdGetWithHttpInfo(sessionId, _options).pipe(map((apiResponse: HttpInfo<Session>) => apiResponse.data));
    }

    /**
     * List Sessions
     */
    public listSessionsSessionsGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<Array<Session>>> {
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
    public listSessionsSessionsGet(_options?: Configuration): Observable<Array<Session>> {
        return this.listSessionsSessionsGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<Session>>) => apiResponse.data));
    }

    /**
     * Send Message
     * @param sessionId 
     * @param body 
     */
    public sendMessageSessionSessionIdPostWithHttpInfo(sessionId: string, body?: string, _options?: Configuration): Observable<HttpInfo<Session>> {
        const requestContextPromise = this.requestFactory.sendMessageSessionSessionIdPost(sessionId, body, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.sendMessageSessionSessionIdPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * Send Message
     * @param sessionId 
     * @param body 
     */
    public sendMessageSessionSessionIdPost(sessionId: string, body?: string, _options?: Configuration): Observable<Session> {
        return this.sendMessageSessionSessionIdPostWithHttpInfo(sessionId, body, _options).pipe(map((apiResponse: HttpInfo<Session>) => apiResponse.data));
    }

}
