# .AgentApi

All URIs are relative to *http://localhost:5002/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createAgentAgentPost**](AgentApi.md#createAgentAgentPost) | **POST** /agent | Create Agent
[**deleteAgentAgentAgentIdDelete**](AgentApi.md#deleteAgentAgentAgentIdDelete) | **DELETE** /agent/{agent_id} | Delete Agent
[**getAgentAgentAgentIdGet**](AgentApi.md#getAgentAgentAgentIdGet) | **GET** /agent/{agent_id} | Get Agent
[**listAgentsAgentsGet**](AgentApi.md#listAgentsAgentsGet) | **GET** /agents | List Agents
[**updateAgentAgentAgentIdPut**](AgentApi.md#updateAgentAgentAgentIdPut) | **PUT** /agent/{agent_id} | Update Agent


# **createAgentAgentPost**
> SavedAgentSpecification createAgentAgentPost(agentSpecification)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AgentApi(configuration);

let body:.AgentApiCreateAgentAgentPostRequest = {
  // AgentSpecification
  agentSpecification: null,
};

apiInstance.createAgentAgentPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **agentSpecification** | **AgentSpecification**|  |


### Return type

**SavedAgentSpecification**

### Authorization

[HTTPBearer](README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteAgentAgentAgentIdDelete**
> any deleteAgentAgentAgentIdDelete()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AgentApi(configuration);

let body:.AgentApiDeleteAgentAgentAgentIdDeleteRequest = {
  // string
  agentId: "agent_id_example",
};

apiInstance.deleteAgentAgentAgentIdDelete(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **agentId** | [**string**] |  | defaults to undefined


### Return type

**any**

### Authorization

[HTTPBearer](README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAgentAgentAgentIdGet**
> SavedAgentSpecification getAgentAgentAgentIdGet()

Get a specific agent by its ID

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AgentApi(configuration);

let body:.AgentApiGetAgentAgentAgentIdGetRequest = {
  // string
  agentId: "agent_id_example",
};

apiInstance.getAgentAgentAgentIdGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **agentId** | [**string**] |  | defaults to undefined


### Return type

**SavedAgentSpecification**

### Authorization

[HTTPBearer](README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **listAgentsAgentsGet**
> Array<SavedAgentSpecification> listAgentsAgentsGet()

List all agents you have access to

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AgentApi(configuration);

let body:any = {};

apiInstance.listAgentsAgentsGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<SavedAgentSpecification>**

### Authorization

[HTTPBearer](README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateAgentAgentAgentIdPut**
> SavedAgentSpecification updateAgentAgentAgentIdPut(agentSpecification)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AgentApi(configuration);

let body:.AgentApiUpdateAgentAgentAgentIdPutRequest = {
  // string
  agentId: "agent_id_example",
  // AgentSpecification
  agentSpecification: null,
};

apiInstance.updateAgentAgentAgentIdPut(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **agentSpecification** | **AgentSpecification**|  |
 **agentId** | [**string**] |  | defaults to undefined


### Return type

**SavedAgentSpecification**

### Authorization

[HTTPBearer](README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


