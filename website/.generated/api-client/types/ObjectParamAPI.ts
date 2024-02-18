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

import { ObservableAgentApi } from "./ObservableAPI";
import { AgentApiRequestFactory, AgentApiResponseProcessor} from "../apis/AgentApi";

export interface AgentApiCreateAgentAgentsPostRequest {
    /**
     * 
     * @type AgentSpecification
     * @memberof AgentApicreateAgentAgentsPost
     */
    agentSpecification: AgentSpecification
}

export interface AgentApiDeleteAgentAgentsAgentIdDeleteRequest {
    /**
     * 
     * @type string
     * @memberof AgentApideleteAgentAgentsAgentIdDelete
     */
    agentId: string
}

export interface AgentApiGetAgentAgentsAgentIdGetRequest {
    /**
     * 
     * @type string
     * @memberof AgentApigetAgentAgentsAgentIdGet
     */
    agentId: string
}

export interface AgentApiListAgentsAgentsGetRequest {
}

export interface AgentApiOptionsAgentsOptionsRequest {
}

export interface AgentApiUpdateAgentAgentsAgentIdPutRequest {
    /**
     * 
     * @type string
     * @memberof AgentApiupdateAgentAgentsAgentIdPut
     */
    agentId: string
    /**
     * 
     * @type AgentSpecification
     * @memberof AgentApiupdateAgentAgentsAgentIdPut
     */
    agentSpecification: AgentSpecification
}

export class ObjectAgentApi {
    private api: ObservableAgentApi

    public constructor(configuration: Configuration, requestFactory?: AgentApiRequestFactory, responseProcessor?: AgentApiResponseProcessor) {
        this.api = new ObservableAgentApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create a new agent
     * Create Agent
     * @param param the request object
     */
    public createAgentAgentsPostWithHttpInfo(param: AgentApiCreateAgentAgentsPostRequest, options?: Configuration): Promise<HttpInfo<SavedAgentSpecification>> {
        return this.api.createAgentAgentsPostWithHttpInfo(param.agentSpecification,  options).toPromise();
    }

    /**
     * Create a new agent
     * Create Agent
     * @param param the request object
     */
    public createAgentAgentsPost(param: AgentApiCreateAgentAgentsPostRequest, options?: Configuration): Promise<SavedAgentSpecification> {
        return this.api.createAgentAgentsPost(param.agentSpecification,  options).toPromise();
    }

    /**
     * Delete a specific agent by its ID
     * Delete Agent
     * @param param the request object
     */
    public deleteAgentAgentsAgentIdDeleteWithHttpInfo(param: AgentApiDeleteAgentAgentsAgentIdDeleteRequest, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.deleteAgentAgentsAgentIdDeleteWithHttpInfo(param.agentId,  options).toPromise();
    }

    /**
     * Delete a specific agent by its ID
     * Delete Agent
     * @param param the request object
     */
    public deleteAgentAgentsAgentIdDelete(param: AgentApiDeleteAgentAgentsAgentIdDeleteRequest, options?: Configuration): Promise<any> {
        return this.api.deleteAgentAgentsAgentIdDelete(param.agentId,  options).toPromise();
    }

    /**
     * Get a specific agent by its ID
     * Get Agent
     * @param param the request object
     */
    public getAgentAgentsAgentIdGetWithHttpInfo(param: AgentApiGetAgentAgentsAgentIdGetRequest, options?: Configuration): Promise<HttpInfo<SavedAgentSpecification>> {
        return this.api.getAgentAgentsAgentIdGetWithHttpInfo(param.agentId,  options).toPromise();
    }

    /**
     * Get a specific agent by its ID
     * Get Agent
     * @param param the request object
     */
    public getAgentAgentsAgentIdGet(param: AgentApiGetAgentAgentsAgentIdGetRequest, options?: Configuration): Promise<SavedAgentSpecification> {
        return this.api.getAgentAgentsAgentIdGet(param.agentId,  options).toPromise();
    }

    /**
     * List all agents you have access to
     * List Agents
     * @param param the request object
     */
    public listAgentsAgentsGetWithHttpInfo(param: AgentApiListAgentsAgentsGetRequest = {}, options?: Configuration): Promise<HttpInfo<Array<SavedAgentSpecification>>> {
        return this.api.listAgentsAgentsGetWithHttpInfo( options).toPromise();
    }

    /**
     * List all agents you have access to
     * List Agents
     * @param param the request object
     */
    public listAgentsAgentsGet(param: AgentApiListAgentsAgentsGetRequest = {}, options?: Configuration): Promise<Array<SavedAgentSpecification>> {
        return this.api.listAgentsAgentsGet( options).toPromise();
    }

    /**
     * Options
     * @param param the request object
     */
    public optionsAgentsOptionsWithHttpInfo(param: AgentApiOptionsAgentsOptionsRequest = {}, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.optionsAgentsOptionsWithHttpInfo( options).toPromise();
    }

    /**
     * Options
     * @param param the request object
     */
    public optionsAgentsOptions(param: AgentApiOptionsAgentsOptionsRequest = {}, options?: Configuration): Promise<any> {
        return this.api.optionsAgentsOptions( options).toPromise();
    }

    /**
     * Update a specific agent by its ID
     * Update Agent
     * @param param the request object
     */
    public updateAgentAgentsAgentIdPutWithHttpInfo(param: AgentApiUpdateAgentAgentsAgentIdPutRequest, options?: Configuration): Promise<HttpInfo<SavedAgentSpecification>> {
        return this.api.updateAgentAgentsAgentIdPutWithHttpInfo(param.agentId, param.agentSpecification,  options).toPromise();
    }

    /**
     * Update a specific agent by its ID
     * Update Agent
     * @param param the request object
     */
    public updateAgentAgentsAgentIdPut(param: AgentApiUpdateAgentAgentsAgentIdPutRequest, options?: Configuration): Promise<SavedAgentSpecification> {
        return this.api.updateAgentAgentsAgentIdPut(param.agentId, param.agentSpecification,  options).toPromise();
    }

}

import { ObservableAuthApi } from "./ObservableAPI";
import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";

export interface AuthApiCreateAccessTokenAuthPostRequest {
}

export interface AuthApiDeleteScopesAuthScopesDeleteRequest {
    /**
     * 
     * @type Array&lt;string&gt;
     * @memberof AuthApideleteScopesAuthScopesDelete
     */
    requestBody: Array<string>
}

export interface AuthApiGetAuthenticatedUserAuthGetRequest {
}

export interface AuthApiGetScopesAuthScopesGetRequest {
}

export interface AuthApiGrantScopesAuthScopesPutRequest {
    /**
     * 
     * @type Array&lt;string&gt;
     * @memberof AuthApigrantScopesAuthScopesPut
     */
    requestBody: Array<string>
}

export class ObjectAuthApi {
    private api: ObservableAuthApi

    public constructor(configuration: Configuration, requestFactory?: AuthApiRequestFactory, responseProcessor?: AuthApiResponseProcessor) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Access Token
     * @param param the request object
     */
    public createAccessTokenAuthPostWithHttpInfo(param: AuthApiCreateAccessTokenAuthPostRequest = {}, options?: Configuration): Promise<HttpInfo<string>> {
        return this.api.createAccessTokenAuthPostWithHttpInfo( options).toPromise();
    }

    /**
     * Create Access Token
     * @param param the request object
     */
    public createAccessTokenAuthPost(param: AuthApiCreateAccessTokenAuthPostRequest = {}, options?: Configuration): Promise<string> {
        return this.api.createAccessTokenAuthPost( options).toPromise();
    }

    /**
     * Delete Scopes
     * @param param the request object
     */
    public deleteScopesAuthScopesDeleteWithHttpInfo(param: AuthApiDeleteScopesAuthScopesDeleteRequest, options?: Configuration): Promise<HttpInfo<Array<string>>> {
        return this.api.deleteScopesAuthScopesDeleteWithHttpInfo(param.requestBody,  options).toPromise();
    }

    /**
     * Delete Scopes
     * @param param the request object
     */
    public deleteScopesAuthScopesDelete(param: AuthApiDeleteScopesAuthScopesDeleteRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.deleteScopesAuthScopesDelete(param.requestBody,  options).toPromise();
    }

    /**
     * Get Authenticated User
     * @param param the request object
     */
    public getAuthenticatedUserAuthGetWithHttpInfo(param: AuthApiGetAuthenticatedUserAuthGetRequest = {}, options?: Configuration): Promise<HttpInfo<FirebaseUser>> {
        return this.api.getAuthenticatedUserAuthGetWithHttpInfo( options).toPromise();
    }

    /**
     * Get Authenticated User
     * @param param the request object
     */
    public getAuthenticatedUserAuthGet(param: AuthApiGetAuthenticatedUserAuthGetRequest = {}, options?: Configuration): Promise<FirebaseUser> {
        return this.api.getAuthenticatedUserAuthGet( options).toPromise();
    }

    /**
     * Get Scopes
     * @param param the request object
     */
    public getScopesAuthScopesGetWithHttpInfo(param: AuthApiGetScopesAuthScopesGetRequest = {}, options?: Configuration): Promise<HttpInfo<Array<string>>> {
        return this.api.getScopesAuthScopesGetWithHttpInfo( options).toPromise();
    }

    /**
     * Get Scopes
     * @param param the request object
     */
    public getScopesAuthScopesGet(param: AuthApiGetScopesAuthScopesGetRequest = {}, options?: Configuration): Promise<Array<string>> {
        return this.api.getScopesAuthScopesGet( options).toPromise();
    }

    /**
     * Grant Scopes
     * @param param the request object
     */
    public grantScopesAuthScopesPutWithHttpInfo(param: AuthApiGrantScopesAuthScopesPutRequest, options?: Configuration): Promise<HttpInfo<Array<string>>> {
        return this.api.grantScopesAuthScopesPutWithHttpInfo(param.requestBody,  options).toPromise();
    }

    /**
     * Grant Scopes
     * @param param the request object
     */
    public grantScopesAuthScopesPut(param: AuthApiGrantScopesAuthScopesPutRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.grantScopesAuthScopesPut(param.requestBody,  options).toPromise();
    }

}

import { ObservableSessionApi } from "./ObservableAPI";
import { SessionApiRequestFactory, SessionApiResponseProcessor} from "../apis/SessionApi";

export interface SessionApiCreateSessionSessionsPostRequest {
    /**
     * 
     * @type SessionSpecification
     * @memberof SessionApicreateSessionSessionsPost
     */
    sessionSpecification: SessionSpecification
}

export interface SessionApiGetSummarySessionsSessionIdGetRequest {
    /**
     * 
     * @type any
     * @memberof SessionApigetSummarySessionsSessionIdGet
     */
    sessionId: any
}

export interface SessionApiListSessionsSessionsGetRequest {
}

export interface SessionApiOptionsSessionsOptionsRequest {
}

export interface SessionApiSendMessageSessionsSessionIdPostRequest {
    /**
     * 
     * @type any
     * @memberof SessionApisendMessageSessionsSessionIdPost
     */
    sessionId: any
    /**
     * 
     * @type MessageContentModel
     * @memberof SessionApisendMessageSessionsSessionIdPost
     */
    messageContentModel: MessageContentModel
}

export interface SessionApiSessionIdOptionsSessionsSessionIdOptionsRequest {
    /**
     * 
     * @type any
     * @memberof SessionApisessionIdOptionsSessionsSessionIdOptions
     */
    sessionId: any
}

export class ObjectSessionApi {
    private api: ObservableSessionApi

    public constructor(configuration: Configuration, requestFactory?: SessionApiRequestFactory, responseProcessor?: SessionApiResponseProcessor) {
        this.api = new ObservableSessionApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Session
     * @param param the request object
     */
    public createSessionSessionsPostWithHttpInfo(param: SessionApiCreateSessionSessionsPostRequest, options?: Configuration): Promise<HttpInfo<SavedSessionSpecification>> {
        return this.api.createSessionSessionsPostWithHttpInfo(param.sessionSpecification,  options).toPromise();
    }

    /**
     * Create Session
     * @param param the request object
     */
    public createSessionSessionsPost(param: SessionApiCreateSessionSessionsPostRequest, options?: Configuration): Promise<SavedSessionSpecification> {
        return this.api.createSessionSessionsPost(param.sessionSpecification,  options).toPromise();
    }

    /**
     * Get Summary
     * @param param the request object
     */
    public getSummarySessionsSessionIdGetWithHttpInfo(param: SessionApiGetSummarySessionsSessionIdGetRequest, options?: Configuration): Promise<HttpInfo<Session>> {
        return this.api.getSummarySessionsSessionIdGetWithHttpInfo(param.sessionId,  options).toPromise();
    }

    /**
     * Get Summary
     * @param param the request object
     */
    public getSummarySessionsSessionIdGet(param: SessionApiGetSummarySessionsSessionIdGetRequest, options?: Configuration): Promise<Session> {
        return this.api.getSummarySessionsSessionIdGet(param.sessionId,  options).toPromise();
    }

    /**
     * List Sessions
     * @param param the request object
     */
    public listSessionsSessionsGetWithHttpInfo(param: SessionApiListSessionsSessionsGetRequest = {}, options?: Configuration): Promise<HttpInfo<Array<Session>>> {
        return this.api.listSessionsSessionsGetWithHttpInfo( options).toPromise();
    }

    /**
     * List Sessions
     * @param param the request object
     */
    public listSessionsSessionsGet(param: SessionApiListSessionsSessionsGetRequest = {}, options?: Configuration): Promise<Array<Session>> {
        return this.api.listSessionsSessionsGet( options).toPromise();
    }

    /**
     * Options
     * @param param the request object
     */
    public optionsSessionsOptionsWithHttpInfo(param: SessionApiOptionsSessionsOptionsRequest = {}, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.optionsSessionsOptionsWithHttpInfo( options).toPromise();
    }

    /**
     * Options
     * @param param the request object
     */
    public optionsSessionsOptions(param: SessionApiOptionsSessionsOptionsRequest = {}, options?: Configuration): Promise<any> {
        return this.api.optionsSessionsOptions( options).toPromise();
    }

    /**
     * Send Message
     * @param param the request object
     */
    public sendMessageSessionsSessionIdPostWithHttpInfo(param: SessionApiSendMessageSessionsSessionIdPostRequest, options?: Configuration): Promise<HttpInfo<Session>> {
        return this.api.sendMessageSessionsSessionIdPostWithHttpInfo(param.sessionId, param.messageContentModel,  options).toPromise();
    }

    /**
     * Send Message
     * @param param the request object
     */
    public sendMessageSessionsSessionIdPost(param: SessionApiSendMessageSessionsSessionIdPostRequest, options?: Configuration): Promise<Session> {
        return this.api.sendMessageSessionsSessionIdPost(param.sessionId, param.messageContentModel,  options).toPromise();
    }

    /**
     * Session Id Options
     * @param param the request object
     */
    public sessionIdOptionsSessionsSessionIdOptionsWithHttpInfo(param: SessionApiSessionIdOptionsSessionsSessionIdOptionsRequest, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.sessionIdOptionsSessionsSessionIdOptionsWithHttpInfo(param.sessionId,  options).toPromise();
    }

    /**
     * Session Id Options
     * @param param the request object
     */
    public sessionIdOptionsSessionsSessionIdOptions(param: SessionApiSessionIdOptionsSessionsSessionIdOptionsRequest, options?: Configuration): Promise<any> {
        return this.api.sessionIdOptionsSessionsSessionIdOptions(param.sessionId,  options).toPromise();
    }

}
