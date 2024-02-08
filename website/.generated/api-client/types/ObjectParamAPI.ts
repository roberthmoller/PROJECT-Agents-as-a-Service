import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

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

import { ObservableAgentApi } from "./ObservableAPI";
import { AgentApiRequestFactory, AgentApiResponseProcessor} from "../apis/AgentApi";

export interface AgentApiCreateAgentAgentPostRequest {
    /**
     * 
     * @type AgentSpecification
     * @memberof AgentApicreateAgentAgentPost
     */
    agentSpecification: AgentSpecification
}

export interface AgentApiDeleteAgentAgentAgentIdDeleteRequest {
    /**
     * 
     * @type string
     * @memberof AgentApideleteAgentAgentAgentIdDelete
     */
    agentId: string
}

export interface AgentApiGetAgentAgentAgentIdGetRequest {
    /**
     * 
     * @type string
     * @memberof AgentApigetAgentAgentAgentIdGet
     */
    agentId: string
}

export interface AgentApiListAgentsAgentsGetRequest {
}

export interface AgentApiUpdateAgentAgentAgentIdPutRequest {
    /**
     * 
     * @type string
     * @memberof AgentApiupdateAgentAgentAgentIdPut
     */
    agentId: string
    /**
     * 
     * @type AgentSpecification
     * @memberof AgentApiupdateAgentAgentAgentIdPut
     */
    agentSpecification: AgentSpecification
}

export class ObjectAgentApi {
    private api: ObservableAgentApi

    public constructor(configuration: Configuration, requestFactory?: AgentApiRequestFactory, responseProcessor?: AgentApiResponseProcessor) {
        this.api = new ObservableAgentApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Agent
     * @param param the request object
     */
    public createAgentAgentPostWithHttpInfo(param: AgentApiCreateAgentAgentPostRequest, options?: Configuration): Promise<HttpInfo<SavedAgentSpecification>> {
        return this.api.createAgentAgentPostWithHttpInfo(param.agentSpecification,  options).toPromise();
    }

    /**
     * Create Agent
     * @param param the request object
     */
    public createAgentAgentPost(param: AgentApiCreateAgentAgentPostRequest, options?: Configuration): Promise<SavedAgentSpecification> {
        return this.api.createAgentAgentPost(param.agentSpecification,  options).toPromise();
    }

    /**
     * Delete Agent
     * @param param the request object
     */
    public deleteAgentAgentAgentIdDeleteWithHttpInfo(param: AgentApiDeleteAgentAgentAgentIdDeleteRequest, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.deleteAgentAgentAgentIdDeleteWithHttpInfo(param.agentId,  options).toPromise();
    }

    /**
     * Delete Agent
     * @param param the request object
     */
    public deleteAgentAgentAgentIdDelete(param: AgentApiDeleteAgentAgentAgentIdDeleteRequest, options?: Configuration): Promise<any> {
        return this.api.deleteAgentAgentAgentIdDelete(param.agentId,  options).toPromise();
    }

    /**
     * Get a specific agent by its ID
     * Get Agent
     * @param param the request object
     */
    public getAgentAgentAgentIdGetWithHttpInfo(param: AgentApiGetAgentAgentAgentIdGetRequest, options?: Configuration): Promise<HttpInfo<SavedAgentSpecification>> {
        return this.api.getAgentAgentAgentIdGetWithHttpInfo(param.agentId,  options).toPromise();
    }

    /**
     * Get a specific agent by its ID
     * Get Agent
     * @param param the request object
     */
    public getAgentAgentAgentIdGet(param: AgentApiGetAgentAgentAgentIdGetRequest, options?: Configuration): Promise<SavedAgentSpecification> {
        return this.api.getAgentAgentAgentIdGet(param.agentId,  options).toPromise();
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
     * Update Agent
     * @param param the request object
     */
    public updateAgentAgentAgentIdPutWithHttpInfo(param: AgentApiUpdateAgentAgentAgentIdPutRequest, options?: Configuration): Promise<HttpInfo<SavedAgentSpecification>> {
        return this.api.updateAgentAgentAgentIdPutWithHttpInfo(param.agentId, param.agentSpecification,  options).toPromise();
    }

    /**
     * Update Agent
     * @param param the request object
     */
    public updateAgentAgentAgentIdPut(param: AgentApiUpdateAgentAgentAgentIdPutRequest, options?: Configuration): Promise<SavedAgentSpecification> {
        return this.api.updateAgentAgentAgentIdPut(param.agentId, param.agentSpecification,  options).toPromise();
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

export interface SessionApiCreateSessionSessionPostRequest {
    /**
     * 
     * @type SessionSpecification
     * @memberof SessionApicreateSessionSessionPost
     */
    sessionSpecification: SessionSpecification
}

export interface SessionApiGetSummarySessionSessionIdGetRequest {
    /**
     * 
     * @type string
     * @memberof SessionApigetSummarySessionSessionIdGet
     */
    sessionId: string
}

export interface SessionApiListSessionsSessionsGetRequest {
}

export interface SessionApiSendMessageSessionSessionIdPostRequest {
    /**
     * 
     * @type string
     * @memberof SessionApisendMessageSessionSessionIdPost
     */
    sessionId: string
    /**
     * 
     * @type string
     * @memberof SessionApisendMessageSessionSessionIdPost
     */
    body?: string
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
    public createSessionSessionPostWithHttpInfo(param: SessionApiCreateSessionSessionPostRequest, options?: Configuration): Promise<HttpInfo<SavedSessionSpecification>> {
        return this.api.createSessionSessionPostWithHttpInfo(param.sessionSpecification,  options).toPromise();
    }

    /**
     * Create Session
     * @param param the request object
     */
    public createSessionSessionPost(param: SessionApiCreateSessionSessionPostRequest, options?: Configuration): Promise<SavedSessionSpecification> {
        return this.api.createSessionSessionPost(param.sessionSpecification,  options).toPromise();
    }

    /**
     * Get Summary
     * @param param the request object
     */
    public getSummarySessionSessionIdGetWithHttpInfo(param: SessionApiGetSummarySessionSessionIdGetRequest, options?: Configuration): Promise<HttpInfo<Session>> {
        return this.api.getSummarySessionSessionIdGetWithHttpInfo(param.sessionId,  options).toPromise();
    }

    /**
     * Get Summary
     * @param param the request object
     */
    public getSummarySessionSessionIdGet(param: SessionApiGetSummarySessionSessionIdGetRequest, options?: Configuration): Promise<Session> {
        return this.api.getSummarySessionSessionIdGet(param.sessionId,  options).toPromise();
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
     * Send Message
     * @param param the request object
     */
    public sendMessageSessionSessionIdPostWithHttpInfo(param: SessionApiSendMessageSessionSessionIdPostRequest, options?: Configuration): Promise<HttpInfo<Session>> {
        return this.api.sendMessageSessionSessionIdPostWithHttpInfo(param.sessionId, param.body,  options).toPromise();
    }

    /**
     * Send Message
     * @param param the request object
     */
    public sendMessageSessionSessionIdPost(param: SessionApiSendMessageSessionSessionIdPostRequest, options?: Configuration): Promise<Session> {
        return this.api.sendMessageSessionSessionIdPost(param.sessionId, param.body,  options).toPromise();
    }

}
