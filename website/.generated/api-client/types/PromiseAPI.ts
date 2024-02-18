import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { AgentSpecification } from '../models/AgentSpecification';
import { FirebaseUser } from '../models/FirebaseUser';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { MessageContentModel } from '../models/MessageContentModel';
import { Name } from '../models/Name';
import { PhoneNumber } from '../models/PhoneNumber';
import { PhotoUrl } from '../models/PhotoUrl';
import { SavedAgentSpecification } from '../models/SavedAgentSpecification';
import { SavedMessageModel } from '../models/SavedMessageModel';
import { SavedSessionSpecification } from '../models/SavedSessionSpecification';
import { Session } from '../models/Session';
import { SessionSpecification } from '../models/SessionSpecification';
import { ValidationError } from '../models/ValidationError';
import { ObservableAgentApi } from './ObservableAPI';

import { AgentApiRequestFactory, AgentApiResponseProcessor} from "../apis/AgentApi";
export class PromiseAgentApi {
    private api: ObservableAgentApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AgentApiRequestFactory,
        responseProcessor?: AgentApiResponseProcessor
    ) {
        this.api = new ObservableAgentApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create a new agent
     * Create Agent
     * @param agentSpecification 
     */
    public createAgentAgentsPostWithHttpInfo(agentSpecification: AgentSpecification, _options?: Configuration): Promise<HttpInfo<SavedAgentSpecification>> {
        const result = this.api.createAgentAgentsPostWithHttpInfo(agentSpecification, _options);
        return result.toPromise();
    }

    /**
     * Create a new agent
     * Create Agent
     * @param agentSpecification 
     */
    public createAgentAgentsPost(agentSpecification: AgentSpecification, _options?: Configuration): Promise<SavedAgentSpecification> {
        const result = this.api.createAgentAgentsPost(agentSpecification, _options);
        return result.toPromise();
    }

    /**
     * Delete a specific agent by its ID
     * Delete Agent
     * @param agentId 
     */
    public deleteAgentAgentsAgentIdDeleteWithHttpInfo(agentId: string, _options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.deleteAgentAgentsAgentIdDeleteWithHttpInfo(agentId, _options);
        return result.toPromise();
    }

    /**
     * Delete a specific agent by its ID
     * Delete Agent
     * @param agentId 
     */
    public deleteAgentAgentsAgentIdDelete(agentId: string, _options?: Configuration): Promise<any> {
        const result = this.api.deleteAgentAgentsAgentIdDelete(agentId, _options);
        return result.toPromise();
    }

    /**
     * Get a specific agent by its ID
     * Get Agent
     * @param agentId 
     */
    public getAgentAgentsAgentIdGetWithHttpInfo(agentId: string, _options?: Configuration): Promise<HttpInfo<SavedAgentSpecification>> {
        const result = this.api.getAgentAgentsAgentIdGetWithHttpInfo(agentId, _options);
        return result.toPromise();
    }

    /**
     * Get a specific agent by its ID
     * Get Agent
     * @param agentId 
     */
    public getAgentAgentsAgentIdGet(agentId: string, _options?: Configuration): Promise<SavedAgentSpecification> {
        const result = this.api.getAgentAgentsAgentIdGet(agentId, _options);
        return result.toPromise();
    }

    /**
     * List all agents you have access to
     * List Agents
     */
    public listAgentsAgentsGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<Array<SavedAgentSpecification>>> {
        const result = this.api.listAgentsAgentsGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * List all agents you have access to
     * List Agents
     */
    public listAgentsAgentsGet(_options?: Configuration): Promise<Array<SavedAgentSpecification>> {
        const result = this.api.listAgentsAgentsGet(_options);
        return result.toPromise();
    }

    /**
     * Options
     */
    public optionsAgentsOptionsWithHttpInfo(_options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.optionsAgentsOptionsWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Options
     */
    public optionsAgentsOptions(_options?: Configuration): Promise<any> {
        const result = this.api.optionsAgentsOptions(_options);
        return result.toPromise();
    }

    /**
     * Update a specific agent by its ID
     * Update Agent
     * @param agentId 
     * @param agentSpecification 
     */
    public updateAgentAgentsAgentIdPutWithHttpInfo(agentId: string, agentSpecification: AgentSpecification, _options?: Configuration): Promise<HttpInfo<SavedAgentSpecification>> {
        const result = this.api.updateAgentAgentsAgentIdPutWithHttpInfo(agentId, agentSpecification, _options);
        return result.toPromise();
    }

    /**
     * Update a specific agent by its ID
     * Update Agent
     * @param agentId 
     * @param agentSpecification 
     */
    public updateAgentAgentsAgentIdPut(agentId: string, agentSpecification: AgentSpecification, _options?: Configuration): Promise<SavedAgentSpecification> {
        const result = this.api.updateAgentAgentsAgentIdPut(agentId, agentSpecification, _options);
        return result.toPromise();
    }


}



import { ObservableAuthApi } from './ObservableAPI';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class PromiseAuthApi {
    private api: ObservableAuthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Access Token
     */
    public createAccessTokenAuthPostWithHttpInfo(_options?: Configuration): Promise<HttpInfo<string>> {
        const result = this.api.createAccessTokenAuthPostWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Create Access Token
     */
    public createAccessTokenAuthPost(_options?: Configuration): Promise<string> {
        const result = this.api.createAccessTokenAuthPost(_options);
        return result.toPromise();
    }

    /**
     * Delete Scopes
     * @param requestBody 
     */
    public deleteScopesAuthScopesDeleteWithHttpInfo(requestBody: Array<string>, _options?: Configuration): Promise<HttpInfo<Array<string>>> {
        const result = this.api.deleteScopesAuthScopesDeleteWithHttpInfo(requestBody, _options);
        return result.toPromise();
    }

    /**
     * Delete Scopes
     * @param requestBody 
     */
    public deleteScopesAuthScopesDelete(requestBody: Array<string>, _options?: Configuration): Promise<Array<string>> {
        const result = this.api.deleteScopesAuthScopesDelete(requestBody, _options);
        return result.toPromise();
    }

    /**
     * Get Authenticated User
     */
    public getAuthenticatedUserAuthGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<FirebaseUser>> {
        const result = this.api.getAuthenticatedUserAuthGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Get Authenticated User
     */
    public getAuthenticatedUserAuthGet(_options?: Configuration): Promise<FirebaseUser> {
        const result = this.api.getAuthenticatedUserAuthGet(_options);
        return result.toPromise();
    }

    /**
     * Get Scopes
     */
    public getScopesAuthScopesGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<Array<string>>> {
        const result = this.api.getScopesAuthScopesGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Get Scopes
     */
    public getScopesAuthScopesGet(_options?: Configuration): Promise<Array<string>> {
        const result = this.api.getScopesAuthScopesGet(_options);
        return result.toPromise();
    }

    /**
     * Grant Scopes
     * @param requestBody 
     */
    public grantScopesAuthScopesPutWithHttpInfo(requestBody: Array<string>, _options?: Configuration): Promise<HttpInfo<Array<string>>> {
        const result = this.api.grantScopesAuthScopesPutWithHttpInfo(requestBody, _options);
        return result.toPromise();
    }

    /**
     * Grant Scopes
     * @param requestBody 
     */
    public grantScopesAuthScopesPut(requestBody: Array<string>, _options?: Configuration): Promise<Array<string>> {
        const result = this.api.grantScopesAuthScopesPut(requestBody, _options);
        return result.toPromise();
    }


}



import { ObservableSessionApi } from './ObservableAPI';

import { SessionApiRequestFactory, SessionApiResponseProcessor} from "../apis/SessionApi";
export class PromiseSessionApi {
    private api: ObservableSessionApi

    public constructor(
        configuration: Configuration,
        requestFactory?: SessionApiRequestFactory,
        responseProcessor?: SessionApiResponseProcessor
    ) {
        this.api = new ObservableSessionApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Session
     * @param sessionSpecification 
     */
    public createSessionSessionsPostWithHttpInfo(sessionSpecification: SessionSpecification, _options?: Configuration): Promise<HttpInfo<SavedSessionSpecification>> {
        const result = this.api.createSessionSessionsPostWithHttpInfo(sessionSpecification, _options);
        return result.toPromise();
    }

    /**
     * Create Session
     * @param sessionSpecification 
     */
    public createSessionSessionsPost(sessionSpecification: SessionSpecification, _options?: Configuration): Promise<SavedSessionSpecification> {
        const result = this.api.createSessionSessionsPost(sessionSpecification, _options);
        return result.toPromise();
    }

    /**
     * Get Summary
     * @param sessionId 
     */
    public getSummarySessionsSessionIdGetWithHttpInfo(sessionId: any, _options?: Configuration): Promise<HttpInfo<Session>> {
        const result = this.api.getSummarySessionsSessionIdGetWithHttpInfo(sessionId, _options);
        return result.toPromise();
    }

    /**
     * Get Summary
     * @param sessionId 
     */
    public getSummarySessionsSessionIdGet(sessionId: any, _options?: Configuration): Promise<Session> {
        const result = this.api.getSummarySessionsSessionIdGet(sessionId, _options);
        return result.toPromise();
    }

    /**
     * List Sessions
     */
    public listSessionsSessionsGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<Array<Session>>> {
        const result = this.api.listSessionsSessionsGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * List Sessions
     */
    public listSessionsSessionsGet(_options?: Configuration): Promise<Array<Session>> {
        const result = this.api.listSessionsSessionsGet(_options);
        return result.toPromise();
    }

    /**
     * Options
     */
    public optionsSessionsOptionsWithHttpInfo(_options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.optionsSessionsOptionsWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Options
     */
    public optionsSessionsOptions(_options?: Configuration): Promise<any> {
        const result = this.api.optionsSessionsOptions(_options);
        return result.toPromise();
    }

    /**
     * Send Message
     * @param sessionId 
     * @param messageContentModel 
     */
    public sendMessageSessionsSessionIdPostWithHttpInfo(sessionId: any, messageContentModel: MessageContentModel, _options?: Configuration): Promise<HttpInfo<Session>> {
        const result = this.api.sendMessageSessionsSessionIdPostWithHttpInfo(sessionId, messageContentModel, _options);
        return result.toPromise();
    }

    /**
     * Send Message
     * @param sessionId 
     * @param messageContentModel 
     */
    public sendMessageSessionsSessionIdPost(sessionId: any, messageContentModel: MessageContentModel, _options?: Configuration): Promise<Session> {
        const result = this.api.sendMessageSessionsSessionIdPost(sessionId, messageContentModel, _options);
        return result.toPromise();
    }

    /**
     * Session Id Options
     * @param sessionId 
     */
    public sessionIdOptionsSessionsSessionIdOptionsWithHttpInfo(sessionId: any, _options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.sessionIdOptionsSessionsSessionIdOptionsWithHttpInfo(sessionId, _options);
        return result.toPromise();
    }

    /**
     * Session Id Options
     * @param sessionId 
     */
    public sessionIdOptionsSessionsSessionIdOptions(sessionId: any, _options?: Configuration): Promise<any> {
        const result = this.api.sessionIdOptionsSessionsSessionIdOptions(sessionId, _options);
        return result.toPromise();
    }


}



