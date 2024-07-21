import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { AgentSpecification } from '../models/AgentSpecification';
import { AgentSpecificationModelsInner } from '../models/AgentSpecificationModelsInner';
import { ApiKey } from '../models/ApiKey';
import { Code } from '../models/Code';
import { FirebaseUser } from '../models/FirebaseUser';
import { GroqLlmModel } from '../models/GroqLlmModel';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { LocalLlmModel } from '../models/LocalLlmModel';
import { MessageContentModel } from '../models/MessageContentModel';
import { ModelConnection } from '../models/ModelConnection';
import { ModelDetails } from '../models/ModelDetails';
import { ModelProviderConnection } from '../models/ModelProviderConnection';
import { OpenAILlmModel } from '../models/OpenAILlmModel';
import { Requirements } from '../models/Requirements';
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
import { ValidationErrorLocInner } from '../models/ValidationErrorLocInner';
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
     * Create Api Key
     * @param apiKey 
     */
    public createApiKeyAuthApiKeyPostWithHttpInfo(apiKey: ApiKey, _options?: Configuration): Promise<HttpInfo<SecretApiKey>> {
        const result = this.api.createApiKeyAuthApiKeyPostWithHttpInfo(apiKey, _options);
        return result.toPromise();
    }

    /**
     * Create Api Key
     * @param apiKey 
     */
    public createApiKeyAuthApiKeyPost(apiKey: ApiKey, _options?: Configuration): Promise<SecretApiKey> {
        const result = this.api.createApiKeyAuthApiKeyPost(apiKey, _options);
        return result.toPromise();
    }

    /**
     * Delete Api Key
     * @param keyId 
     */
    public deleteApiKeyAuthApiKeyKeyIdDeleteWithHttpInfo(keyId: string, _options?: Configuration): Promise<HttpInfo<string>> {
        const result = this.api.deleteApiKeyAuthApiKeyKeyIdDeleteWithHttpInfo(keyId, _options);
        return result.toPromise();
    }

    /**
     * Delete Api Key
     * @param keyId 
     */
    public deleteApiKeyAuthApiKeyKeyIdDelete(keyId: string, _options?: Configuration): Promise<string> {
        const result = this.api.deleteApiKeyAuthApiKeyKeyIdDelete(keyId, _options);
        return result.toPromise();
    }

    /**
     * Get Api Key
     * @param keyId 
     */
    public getApiKeyAuthApiKeyKeyIdGetWithHttpInfo(keyId: string, _options?: Configuration): Promise<HttpInfo<SavedApiKey>> {
        const result = this.api.getApiKeyAuthApiKeyKeyIdGetWithHttpInfo(keyId, _options);
        return result.toPromise();
    }

    /**
     * Get Api Key
     * @param keyId 
     */
    public getApiKeyAuthApiKeyKeyIdGet(keyId: string, _options?: Configuration): Promise<SavedApiKey> {
        const result = this.api.getApiKeyAuthApiKeyKeyIdGet(keyId, _options);
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


}



import { ObservableDefaultApi } from './ObservableAPI';

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class PromiseDefaultApi {
    private api: ObservableDefaultApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get Env
     */
    public getEnvEnvGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.getEnvEnvGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Get Env
     */
    public getEnvEnvGet(_options?: Configuration): Promise<any> {
        const result = this.api.getEnvEnvGet(_options);
        return result.toPromise();
    }


}



import { ObservableProvidersApi } from './ObservableAPI';

import { ProvidersApiRequestFactory, ProvidersApiResponseProcessor} from "../apis/ProvidersApi";
export class PromiseProvidersApi {
    private api: ObservableProvidersApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ProvidersApiRequestFactory,
        responseProcessor?: ProvidersApiResponseProcessor
    ) {
        this.api = new ObservableProvidersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Connect Provider
     * @param provider 
     * @param modelConnection 
     */
    public connectProviderProvidersProviderPostWithHttpInfo(provider: string, modelConnection: ModelConnection, _options?: Configuration): Promise<HttpInfo<ModelProviderConnection>> {
        const result = this.api.connectProviderProvidersProviderPostWithHttpInfo(provider, modelConnection, _options);
        return result.toPromise();
    }

    /**
     * Connect Provider
     * @param provider 
     * @param modelConnection 
     */
    public connectProviderProvidersProviderPost(provider: string, modelConnection: ModelConnection, _options?: Configuration): Promise<ModelProviderConnection> {
        const result = this.api.connectProviderProvidersProviderPost(provider, modelConnection, _options);
        return result.toPromise();
    }

    /**
     * Disconnect Provider
     * @param provider 
     */
    public disconnectProviderProvidersProviderDeleteWithHttpInfo(provider: string, _options?: Configuration): Promise<HttpInfo<ModelProviderConnection>> {
        const result = this.api.disconnectProviderProvidersProviderDeleteWithHttpInfo(provider, _options);
        return result.toPromise();
    }

    /**
     * Disconnect Provider
     * @param provider 
     */
    public disconnectProviderProvidersProviderDelete(provider: string, _options?: Configuration): Promise<ModelProviderConnection> {
        const result = this.api.disconnectProviderProvidersProviderDelete(provider, _options);
        return result.toPromise();
    }

    /**
     * Get Provider
     * @param provider 
     */
    public getProviderProvidersProviderGetWithHttpInfo(provider: string, _options?: Configuration): Promise<HttpInfo<ModelProviderConnection>> {
        const result = this.api.getProviderProvidersProviderGetWithHttpInfo(provider, _options);
        return result.toPromise();
    }

    /**
     * Get Provider
     * @param provider 
     */
    public getProviderProvidersProviderGet(provider: string, _options?: Configuration): Promise<ModelProviderConnection> {
        const result = this.api.getProviderProvidersProviderGet(provider, _options);
        return result.toPromise();
    }

    /**
     * List Providers
     */
    public listProvidersProvidersGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<Array<ModelProviderConnection>>> {
        const result = this.api.listProvidersProvidersGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * List Providers
     */
    public listProvidersProvidersGet(_options?: Configuration): Promise<Array<ModelProviderConnection>> {
        const result = this.api.listProvidersProvidersGet(_options);
        return result.toPromise();
    }

    /**
     * Options
     */
    public optionsProvidersOptionsWithHttpInfo(_options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.optionsProvidersOptionsWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Options
     */
    public optionsProvidersOptions(_options?: Configuration): Promise<any> {
        const result = this.api.optionsProvidersOptions(_options);
        return result.toPromise();
    }

    /**
     * Options
     * @param provider 
     */
    public optionsProvidersProviderOptionsWithHttpInfo(provider: string, _options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.optionsProvidersProviderOptionsWithHttpInfo(provider, _options);
        return result.toPromise();
    }

    /**
     * Options
     * @param provider 
     */
    public optionsProvidersProviderOptions(provider: string, _options?: Configuration): Promise<any> {
        const result = this.api.optionsProvidersProviderOptions(provider, _options);
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
    public getSummarySessionsSessionIdGetWithHttpInfo(sessionId: string, _options?: Configuration): Promise<HttpInfo<Session>> {
        const result = this.api.getSummarySessionsSessionIdGetWithHttpInfo(sessionId, _options);
        return result.toPromise();
    }

    /**
     * Get Summary
     * @param sessionId 
     */
    public getSummarySessionsSessionIdGet(sessionId: string, _options?: Configuration): Promise<Session> {
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
     * Send Message
     * @param sessionId 
     * @param messageContentModel 
     */
    public sendMessageSessionsSessionIdPostWithHttpInfo(sessionId: string, messageContentModel: MessageContentModel, _options?: Configuration): Promise<HttpInfo<Session>> {
        const result = this.api.sendMessageSessionsSessionIdPostWithHttpInfo(sessionId, messageContentModel, _options);
        return result.toPromise();
    }

    /**
     * Send Message
     * @param sessionId 
     * @param messageContentModel 
     */
    public sendMessageSessionsSessionIdPost(sessionId: string, messageContentModel: MessageContentModel, _options?: Configuration): Promise<Session> {
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



