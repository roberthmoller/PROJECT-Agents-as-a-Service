// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { Code } from '../models/Code';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { Requirements } from '../models/Requirements';
import { SavedSkillSpecification } from '../models/SavedSkillSpecification';
import { SkillSpecification } from '../models/SkillSpecification';

/**
 * no description
 */
export class SkillsApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Call Skill
     * @param skillId 
     * @param method 
     * @param body 
     */
    public async callSkillSkillsSkillIdPost(skillId: string, method: string, body: any, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'skillId' is not null or undefined
        if (skillId === null || skillId === undefined) {
            throw new RequiredError("SkillsApi", "callSkillSkillsSkillIdPost", "skillId");
        }


        // verify required parameter 'method' is not null or undefined
        if (method === null || method === undefined) {
            throw new RequiredError("SkillsApi", "callSkillSkillsSkillIdPost", "method");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("SkillsApi", "callSkillSkillsSkillIdPost", "body");
        }


        // Path Params
        const localVarPath = '/skills/{skill_id}'
            .replace('{' + 'skill_id' + '}', encodeURIComponent(String(skillId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (method !== undefined) {
            requestContext.setQueryParam("method", ObjectSerializer.serialize(method, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["HTTPBearer"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Create a new skill
     * Create Skill
     * @param skillSpecification 
     */
    public async createSkillSkillsPost(skillSpecification: SkillSpecification, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'skillSpecification' is not null or undefined
        if (skillSpecification === null || skillSpecification === undefined) {
            throw new RequiredError("SkillsApi", "createSkillSkillsPost", "skillSpecification");
        }


        // Path Params
        const localVarPath = '/skills';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(skillSpecification, "SkillSpecification", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["HTTPBearer"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Delete a specific skill by its ID
     * Delete Skill
     * @param skillId 
     */
    public async deleteSkillSkillsSkillIdDelete(skillId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'skillId' is not null or undefined
        if (skillId === null || skillId === undefined) {
            throw new RequiredError("SkillsApi", "deleteSkillSkillsSkillIdDelete", "skillId");
        }


        // Path Params
        const localVarPath = '/skills/{skill_id}'
            .replace('{' + 'skill_id' + '}', encodeURIComponent(String(skillId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["HTTPBearer"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Get a specific agent by its ID
     * Get Skill
     * @param skillId 
     */
    public async getSkillSkillsSkillIdGet(skillId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'skillId' is not null or undefined
        if (skillId === null || skillId === undefined) {
            throw new RequiredError("SkillsApi", "getSkillSkillsSkillIdGet", "skillId");
        }


        // Path Params
        const localVarPath = '/skills/{skill_id}'
            .replace('{' + 'skill_id' + '}', encodeURIComponent(String(skillId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["HTTPBearer"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * List all skills you have access to
     * List Skills
     */
    public async listSkillsSkillsGet(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/skills';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["HTTPBearer"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Create a new skill
     * Skill Requirements
     * @param code 
     */
    public async skillRequirementsSkillsRequirementsPost(code: Code, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'code' is not null or undefined
        if (code === null || code === undefined) {
            throw new RequiredError("SkillsApi", "skillRequirementsSkillsRequirementsPost", "code");
        }


        // Path Params
        const localVarPath = '/skills/requirements';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(code, "Code", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["HTTPBearer"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Update a specific skill by its ID
     * Update Skill
     * @param skillId 
     * @param skillSpecification 
     */
    public async updateSkillSkillsSkillIdPut(skillId: string, skillSpecification: SkillSpecification, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'skillId' is not null or undefined
        if (skillId === null || skillId === undefined) {
            throw new RequiredError("SkillsApi", "updateSkillSkillsSkillIdPut", "skillId");
        }


        // verify required parameter 'skillSpecification' is not null or undefined
        if (skillSpecification === null || skillSpecification === undefined) {
            throw new RequiredError("SkillsApi", "updateSkillSkillsSkillIdPut", "skillSpecification");
        }


        // Path Params
        const localVarPath = '/skills/{skill_id}'
            .replace('{' + 'skill_id' + '}', encodeURIComponent(String(skillId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(skillSpecification, "SkillSpecification", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["HTTPBearer"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class SkillsApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to callSkillSkillsSkillIdPost
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async callSkillSkillsSkillIdPostWithHttpInfo(response: ResponseContext): Promise<HttpInfo<string >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: string = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "string", ""
            ) as string;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: string = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "string", ""
            ) as string;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createSkillSkillsPost
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createSkillSkillsPostWithHttpInfo(response: ResponseContext): Promise<HttpInfo<SavedSkillSpecification >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: SavedSkillSpecification = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "SavedSkillSpecification", ""
            ) as SavedSkillSpecification;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: SavedSkillSpecification = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "SavedSkillSpecification", ""
            ) as SavedSkillSpecification;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteSkillSkillsSkillIdDelete
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteSkillSkillsSkillIdDeleteWithHttpInfo(response: ResponseContext): Promise<HttpInfo<any >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getSkillSkillsSkillIdGet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getSkillSkillsSkillIdGetWithHttpInfo(response: ResponseContext): Promise<HttpInfo<SavedSkillSpecification >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: SavedSkillSpecification = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "SavedSkillSpecification", ""
            ) as SavedSkillSpecification;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: SavedSkillSpecification = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "SavedSkillSpecification", ""
            ) as SavedSkillSpecification;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to listSkillsSkillsGet
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async listSkillsSkillsGetWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Array<SavedSkillSpecification> >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<SavedSkillSpecification> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<SavedSkillSpecification>", ""
            ) as Array<SavedSkillSpecification>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<SavedSkillSpecification> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<SavedSkillSpecification>", ""
            ) as Array<SavedSkillSpecification>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to skillRequirementsSkillsRequirementsPost
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async skillRequirementsSkillsRequirementsPostWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Requirements >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Requirements = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Requirements", ""
            ) as Requirements;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Requirements = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Requirements", ""
            ) as Requirements;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to updateSkillSkillsSkillIdPut
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async updateSkillSkillsSkillIdPutWithHttpInfo(response: ResponseContext): Promise<HttpInfo<SavedSkillSpecification >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: SavedSkillSpecification = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "SavedSkillSpecification", ""
            ) as SavedSkillSpecification;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: SavedSkillSpecification = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "SavedSkillSpecification", ""
            ) as SavedSkillSpecification;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
