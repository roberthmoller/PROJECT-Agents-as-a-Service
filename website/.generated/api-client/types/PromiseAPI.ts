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
    public listSessionsSessionsGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.listSessionsSessionsGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * List Sessions
     */
    public listSessionsSessionsGet(_options?: Configuration): Promise<any> {
        const result = this.api.listSessionsSessionsGet(_options);
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


}



import { ObservableSkillsApi } from './ObservableAPI';

import { SkillsApiRequestFactory, SkillsApiResponseProcessor} from "../apis/SkillsApi";
export class PromiseSkillsApi {
    private api: ObservableSkillsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: SkillsApiRequestFactory,
        responseProcessor?: SkillsApiResponseProcessor
    ) {
        this.api = new ObservableSkillsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Call Skill
     * @param skillId 
     * @param method 
     * @param body 
     */
    public callSkillSkillsSkillIdPostWithHttpInfo(skillId: string, method: string, body: any, _options?: Configuration): Promise<HttpInfo<string>> {
        const result = this.api.callSkillSkillsSkillIdPostWithHttpInfo(skillId, method, body, _options);
        return result.toPromise();
    }

    /**
     * Call Skill
     * @param skillId 
     * @param method 
     * @param body 
     */
    public callSkillSkillsSkillIdPost(skillId: string, method: string, body: any, _options?: Configuration): Promise<string> {
        const result = this.api.callSkillSkillsSkillIdPost(skillId, method, body, _options);
        return result.toPromise();
    }

    /**
     * Create a new skill
     * Create Skill
     * @param skillSpecification 
     */
    public createSkillSkillsPostWithHttpInfo(skillSpecification: SkillSpecification, _options?: Configuration): Promise<HttpInfo<SavedSkillSpecification>> {
        const result = this.api.createSkillSkillsPostWithHttpInfo(skillSpecification, _options);
        return result.toPromise();
    }

    /**
     * Create a new skill
     * Create Skill
     * @param skillSpecification 
     */
    public createSkillSkillsPost(skillSpecification: SkillSpecification, _options?: Configuration): Promise<SavedSkillSpecification> {
        const result = this.api.createSkillSkillsPost(skillSpecification, _options);
        return result.toPromise();
    }

    /**
     * Delete a specific skill by its ID
     * Delete Skill
     * @param skillId 
     */
    public deleteSkillSkillsSkillIdDeleteWithHttpInfo(skillId: string, _options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.deleteSkillSkillsSkillIdDeleteWithHttpInfo(skillId, _options);
        return result.toPromise();
    }

    /**
     * Delete a specific skill by its ID
     * Delete Skill
     * @param skillId 
     */
    public deleteSkillSkillsSkillIdDelete(skillId: string, _options?: Configuration): Promise<any> {
        const result = this.api.deleteSkillSkillsSkillIdDelete(skillId, _options);
        return result.toPromise();
    }

    /**
     * Get a specific agent by its ID
     * Get Skill
     * @param skillId 
     */
    public getSkillSkillsSkillIdGetWithHttpInfo(skillId: string, _options?: Configuration): Promise<HttpInfo<SavedSkillSpecification>> {
        const result = this.api.getSkillSkillsSkillIdGetWithHttpInfo(skillId, _options);
        return result.toPromise();
    }

    /**
     * Get a specific agent by its ID
     * Get Skill
     * @param skillId 
     */
    public getSkillSkillsSkillIdGet(skillId: string, _options?: Configuration): Promise<SavedSkillSpecification> {
        const result = this.api.getSkillSkillsSkillIdGet(skillId, _options);
        return result.toPromise();
    }

    /**
     * List all skills you have access to
     * List Skills
     */
    public listSkillsSkillsGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<Array<SavedSkillSpecification>>> {
        const result = this.api.listSkillsSkillsGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * List all skills you have access to
     * List Skills
     */
    public listSkillsSkillsGet(_options?: Configuration): Promise<Array<SavedSkillSpecification>> {
        const result = this.api.listSkillsSkillsGet(_options);
        return result.toPromise();
    }

    /**
     * Create a new skill
     * Skill Requirements
     * @param code 
     */
    public skillRequirementsSkillsRequirementsPostWithHttpInfo(code: Code, _options?: Configuration): Promise<HttpInfo<Requirements>> {
        const result = this.api.skillRequirementsSkillsRequirementsPostWithHttpInfo(code, _options);
        return result.toPromise();
    }

    /**
     * Create a new skill
     * Skill Requirements
     * @param code 
     */
    public skillRequirementsSkillsRequirementsPost(code: Code, _options?: Configuration): Promise<Requirements> {
        const result = this.api.skillRequirementsSkillsRequirementsPost(code, _options);
        return result.toPromise();
    }

    /**
     * Update a specific skill by its ID
     * Update Skill
     * @param skillId 
     * @param skillSpecification 
     */
    public updateSkillSkillsSkillIdPutWithHttpInfo(skillId: string, skillSpecification: SkillSpecification, _options?: Configuration): Promise<HttpInfo<SavedSkillSpecification>> {
        const result = this.api.updateSkillSkillsSkillIdPutWithHttpInfo(skillId, skillSpecification, _options);
        return result.toPromise();
    }

    /**
     * Update a specific skill by its ID
     * Update Skill
     * @param skillId 
     * @param skillSpecification 
     */
    public updateSkillSkillsSkillIdPut(skillId: string, skillSpecification: SkillSpecification, _options?: Configuration): Promise<SavedSkillSpecification> {
        const result = this.api.updateSkillSkillsSkillIdPut(skillId, skillSpecification, _options);
        return result.toPromise();
    }


}



