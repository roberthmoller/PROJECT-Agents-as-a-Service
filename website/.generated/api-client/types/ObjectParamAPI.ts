import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { AgentSpecification } from '../models/AgentSpecification';
import { Code } from '../models/Code';
import { FirebaseUser } from '../models/FirebaseUser';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { LocalLlmModel } from '../models/LocalLlmModel';
import { MessageContentModel } from '../models/MessageContentModel';
import { Name } from '../models/Name';
import { OpenAILlmModel } from '../models/OpenAILlmModel';
import { PhoneNumber } from '../models/PhoneNumber';
import { PhotoUrl } from '../models/PhotoUrl';
import { Requirements } from '../models/Requirements';
import { Role } from '../models/Role';
import { SavedAgentSpecification } from '../models/SavedAgentSpecification';
import { SavedMessageModel } from '../models/SavedMessageModel';
import { SavedSessionSpecification } from '../models/SavedSessionSpecification';
import { SavedSkillSpecification } from '../models/SavedSkillSpecification';
import { Session } from '../models/Session';
import { SessionSpecification } from '../models/SessionSpecification';
import { SkillSpecification } from '../models/SkillSpecification';
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
    public listSessionsSessionsGetWithHttpInfo(param: SessionApiListSessionsSessionsGetRequest = {}, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.listSessionsSessionsGetWithHttpInfo( options).toPromise();
    }

    /**
     * List Sessions
     * @param param the request object
     */
    public listSessionsSessionsGet(param: SessionApiListSessionsSessionsGetRequest = {}, options?: Configuration): Promise<any> {
        return this.api.listSessionsSessionsGet( options).toPromise();
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

}

import { ObservableSkillsApi } from "./ObservableAPI";
import { SkillsApiRequestFactory, SkillsApiResponseProcessor} from "../apis/SkillsApi";

export interface SkillsApiCallSkillSkillsSkillIdPostRequest {
    /**
     * 
     * @type string
     * @memberof SkillsApicallSkillSkillsSkillIdPost
     */
    skillId: string
    /**
     * 
     * @type string
     * @memberof SkillsApicallSkillSkillsSkillIdPost
     */
    method: string
    /**
     * 
     * @type any
     * @memberof SkillsApicallSkillSkillsSkillIdPost
     */
    body: any
}

export interface SkillsApiCreateSkillSkillsPostRequest {
    /**
     * 
     * @type SkillSpecification
     * @memberof SkillsApicreateSkillSkillsPost
     */
    skillSpecification: SkillSpecification
}

export interface SkillsApiDeleteSkillSkillsSkillIdDeleteRequest {
    /**
     * 
     * @type string
     * @memberof SkillsApideleteSkillSkillsSkillIdDelete
     */
    skillId: string
}

export interface SkillsApiGetSkillSkillsSkillIdGetRequest {
    /**
     * 
     * @type string
     * @memberof SkillsApigetSkillSkillsSkillIdGet
     */
    skillId: string
}

export interface SkillsApiListSkillsSkillsGetRequest {
}

export interface SkillsApiSkillRequirementsSkillsRequirementsPostRequest {
    /**
     * 
     * @type Code
     * @memberof SkillsApiskillRequirementsSkillsRequirementsPost
     */
    code: Code
}

export interface SkillsApiUpdateSkillSkillsSkillIdPutRequest {
    /**
     * 
     * @type string
     * @memberof SkillsApiupdateSkillSkillsSkillIdPut
     */
    skillId: string
    /**
     * 
     * @type SkillSpecification
     * @memberof SkillsApiupdateSkillSkillsSkillIdPut
     */
    skillSpecification: SkillSpecification
}

export class ObjectSkillsApi {
    private api: ObservableSkillsApi

    public constructor(configuration: Configuration, requestFactory?: SkillsApiRequestFactory, responseProcessor?: SkillsApiResponseProcessor) {
        this.api = new ObservableSkillsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Call Skill
     * @param param the request object
     */
    public callSkillSkillsSkillIdPostWithHttpInfo(param: SkillsApiCallSkillSkillsSkillIdPostRequest, options?: Configuration): Promise<HttpInfo<string>> {
        return this.api.callSkillSkillsSkillIdPostWithHttpInfo(param.skillId, param.method, param.body,  options).toPromise();
    }

    /**
     * Call Skill
     * @param param the request object
     */
    public callSkillSkillsSkillIdPost(param: SkillsApiCallSkillSkillsSkillIdPostRequest, options?: Configuration): Promise<string> {
        return this.api.callSkillSkillsSkillIdPost(param.skillId, param.method, param.body,  options).toPromise();
    }

    /**
     * Create a new skill
     * Create Skill
     * @param param the request object
     */
    public createSkillSkillsPostWithHttpInfo(param: SkillsApiCreateSkillSkillsPostRequest, options?: Configuration): Promise<HttpInfo<SavedSkillSpecification>> {
        return this.api.createSkillSkillsPostWithHttpInfo(param.skillSpecification,  options).toPromise();
    }

    /**
     * Create a new skill
     * Create Skill
     * @param param the request object
     */
    public createSkillSkillsPost(param: SkillsApiCreateSkillSkillsPostRequest, options?: Configuration): Promise<SavedSkillSpecification> {
        return this.api.createSkillSkillsPost(param.skillSpecification,  options).toPromise();
    }

    /**
     * Delete a specific skill by its ID
     * Delete Skill
     * @param param the request object
     */
    public deleteSkillSkillsSkillIdDeleteWithHttpInfo(param: SkillsApiDeleteSkillSkillsSkillIdDeleteRequest, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.deleteSkillSkillsSkillIdDeleteWithHttpInfo(param.skillId,  options).toPromise();
    }

    /**
     * Delete a specific skill by its ID
     * Delete Skill
     * @param param the request object
     */
    public deleteSkillSkillsSkillIdDelete(param: SkillsApiDeleteSkillSkillsSkillIdDeleteRequest, options?: Configuration): Promise<any> {
        return this.api.deleteSkillSkillsSkillIdDelete(param.skillId,  options).toPromise();
    }

    /**
     * Get a specific agent by its ID
     * Get Skill
     * @param param the request object
     */
    public getSkillSkillsSkillIdGetWithHttpInfo(param: SkillsApiGetSkillSkillsSkillIdGetRequest, options?: Configuration): Promise<HttpInfo<SavedSkillSpecification>> {
        return this.api.getSkillSkillsSkillIdGetWithHttpInfo(param.skillId,  options).toPromise();
    }

    /**
     * Get a specific agent by its ID
     * Get Skill
     * @param param the request object
     */
    public getSkillSkillsSkillIdGet(param: SkillsApiGetSkillSkillsSkillIdGetRequest, options?: Configuration): Promise<SavedSkillSpecification> {
        return this.api.getSkillSkillsSkillIdGet(param.skillId,  options).toPromise();
    }

    /**
     * List all skills you have access to
     * List Skills
     * @param param the request object
     */
    public listSkillsSkillsGetWithHttpInfo(param: SkillsApiListSkillsSkillsGetRequest = {}, options?: Configuration): Promise<HttpInfo<Array<SavedSkillSpecification>>> {
        return this.api.listSkillsSkillsGetWithHttpInfo( options).toPromise();
    }

    /**
     * List all skills you have access to
     * List Skills
     * @param param the request object
     */
    public listSkillsSkillsGet(param: SkillsApiListSkillsSkillsGetRequest = {}, options?: Configuration): Promise<Array<SavedSkillSpecification>> {
        return this.api.listSkillsSkillsGet( options).toPromise();
    }

    /**
     * Create a new skill
     * Skill Requirements
     * @param param the request object
     */
    public skillRequirementsSkillsRequirementsPostWithHttpInfo(param: SkillsApiSkillRequirementsSkillsRequirementsPostRequest, options?: Configuration): Promise<HttpInfo<Requirements>> {
        return this.api.skillRequirementsSkillsRequirementsPostWithHttpInfo(param.code,  options).toPromise();
    }

    /**
     * Create a new skill
     * Skill Requirements
     * @param param the request object
     */
    public skillRequirementsSkillsRequirementsPost(param: SkillsApiSkillRequirementsSkillsRequirementsPostRequest, options?: Configuration): Promise<Requirements> {
        return this.api.skillRequirementsSkillsRequirementsPost(param.code,  options).toPromise();
    }

    /**
     * Update a specific skill by its ID
     * Update Skill
     * @param param the request object
     */
    public updateSkillSkillsSkillIdPutWithHttpInfo(param: SkillsApiUpdateSkillSkillsSkillIdPutRequest, options?: Configuration): Promise<HttpInfo<SavedSkillSpecification>> {
        return this.api.updateSkillSkillsSkillIdPutWithHttpInfo(param.skillId, param.skillSpecification,  options).toPromise();
    }

    /**
     * Update a specific skill by its ID
     * Update Skill
     * @param param the request object
     */
    public updateSkillSkillsSkillIdPut(param: SkillsApiUpdateSkillSkillsSkillIdPutRequest, options?: Configuration): Promise<SavedSkillSpecification> {
        return this.api.updateSkillSkillsSkillIdPut(param.skillId, param.skillSpecification,  options).toPromise();
    }

}
