# .AgentApi

All URIs are relative to *http://localhost:5002/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createAgentAgentsPost**](AgentApi.md#createAgentAgentsPost) | **POST** /agents | Create Agent
[**deleteAgentAgentsAgentIdDelete**](AgentApi.md#deleteAgentAgentsAgentIdDelete) | **DELETE** /agents/{agent_id} | Delete Agent
[**getAgentAgentsAgentIdGet**](AgentApi.md#getAgentAgentsAgentIdGet) | **GET** /agents/{agent_id} | Get Agent
[**listAgentsAgentsGet**](AgentApi.md#listAgentsAgentsGet) | **GET** /agents | List Agents
[**updateAgentAgentsAgentIdPut**](AgentApi.md#updateAgentAgentsAgentIdPut) | **PUT** /agents/{agent_id} | Update Agent


# **createAgentAgentsPost**
> SavedAgentSpecification createAgentAgentsPost(agentSpecification)

Create a new agent

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AgentApi(configuration);

let body:.AgentApiCreateAgentAgentsPostRequest = {
  // AgentSpecification
  agentSpecification: null,
};

apiInstance.createAgentAgentsPost(body).then((data:any) => {
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

# **deleteAgentAgentsAgentIdDelete**
> any deleteAgentAgentsAgentIdDelete()

Delete a specific agent by its ID

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AgentApi(configuration);

let body:.AgentApiDeleteAgentAgentsAgentIdDeleteRequest = {
  // string
  agentId: "agent_id_example",
};

apiInstance.deleteAgentAgentsAgentIdDelete(body).then((data:any) => {
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

# **getAgentAgentsAgentIdGet**
> SavedAgentSpecification getAgentAgentsAgentIdGet()

Get a specific agent by its ID

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AgentApi(configuration);

let body:.AgentApiGetAgentAgentsAgentIdGetRequest = {
  // string
  agentId: "agent_id_example",
};

apiInstance.getAgentAgentsAgentIdGet(body).then((data:any) => {
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

# **updateAgentAgentsAgentIdPut**
> SavedAgentSpecification updateAgentAgentsAgentIdPut(agentSpecification)

Update a specific agent by its ID

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AgentApi(configuration);

let body:.AgentApiUpdateAgentAgentsAgentIdPutRequest = {
  // string
  agentId: "agent_id_example",
  // AgentSpecification
  agentSpecification: null,
};

apiInstance.updateAgentAgentsAgentIdPut(body).then((data:any) => {
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


