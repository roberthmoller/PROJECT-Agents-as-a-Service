# .SkillsApi

All URIs are relative to *http://localhost:5002/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**callSkillSkillsSkillIdPost**](SkillsApi.md#callSkillSkillsSkillIdPost) | **POST** /skills/{skill_id} | Call Skill
[**createSkillSkillsPost**](SkillsApi.md#createSkillSkillsPost) | **POST** /skills | Create Skill
[**deleteSkillSkillsSkillIdDelete**](SkillsApi.md#deleteSkillSkillsSkillIdDelete) | **DELETE** /skills/{skill_id} | Delete Skill
[**getSkillSkillsSkillIdGet**](SkillsApi.md#getSkillSkillsSkillIdGet) | **GET** /skills/{skill_id} | Get Skill
[**listSkillsSkillsGet**](SkillsApi.md#listSkillsSkillsGet) | **GET** /skills | List Skills
[**skillRequirementsSkillsRequirementsPost**](SkillsApi.md#skillRequirementsSkillsRequirementsPost) | **POST** /skills/requirements | Skill Requirements
[**updateSkillSkillsSkillIdPut**](SkillsApi.md#updateSkillSkillsSkillIdPut) | **PUT** /skills/{skill_id} | Update Skill


# **callSkillSkillsSkillIdPost**
> string callSkillSkillsSkillIdPost(body)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SkillsApi(configuration);

let body:.SkillsApiCallSkillSkillsSkillIdPostRequest = {
  // string
  skillId: "skill_id_example",
  // string
  method: "method_example",
  // any
  body: {},
};

apiInstance.callSkillSkillsSkillIdPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **skillId** | [**string**] |  | defaults to undefined
 **method** | [**string**] |  | defaults to undefined


### Return type

**string**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [HTTPBearer](README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createSkillSkillsPost**
> SavedSkillSpecification createSkillSkillsPost(skillSpecification)

Create a new skill

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SkillsApi(configuration);

let body:.SkillsApiCreateSkillSkillsPostRequest = {
  // SkillSpecification
  skillSpecification: null,
};

apiInstance.createSkillSkillsPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **skillSpecification** | **SkillSpecification**|  |


### Return type

**SavedSkillSpecification**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [HTTPBearer](README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteSkillSkillsSkillIdDelete**
> any deleteSkillSkillsSkillIdDelete()

Delete a specific skill by its ID

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SkillsApi(configuration);

let body:.SkillsApiDeleteSkillSkillsSkillIdDeleteRequest = {
  // string
  skillId: "skill_id_example",
};

apiInstance.deleteSkillSkillsSkillIdDelete(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **skillId** | [**string**] |  | defaults to undefined


### Return type

**any**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [HTTPBearer](README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getSkillSkillsSkillIdGet**
> SavedSkillSpecification getSkillSkillsSkillIdGet()

Get a specific agent by its ID

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SkillsApi(configuration);

let body:.SkillsApiGetSkillSkillsSkillIdGetRequest = {
  // string
  skillId: "skill_id_example",
};

apiInstance.getSkillSkillsSkillIdGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **skillId** | [**string**] |  | defaults to undefined


### Return type

**SavedSkillSpecification**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [HTTPBearer](README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **listSkillsSkillsGet**
> Array<SavedSkillSpecification> listSkillsSkillsGet()

List all skills you have access to

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SkillsApi(configuration);

let body:any = {};

apiInstance.listSkillsSkillsGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<SavedSkillSpecification>**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [HTTPBearer](README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **skillRequirementsSkillsRequirementsPost**
> Requirements skillRequirementsSkillsRequirementsPost(code)

Create a new skill

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SkillsApi(configuration);

let body:.SkillsApiSkillRequirementsSkillsRequirementsPostRequest = {
  // Code
  code: null,
};

apiInstance.skillRequirementsSkillsRequirementsPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **code** | **Code**|  |


### Return type

**Requirements**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [HTTPBearer](README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateSkillSkillsSkillIdPut**
> SavedSkillSpecification updateSkillSkillsSkillIdPut(skillSpecification)

Update a specific skill by its ID

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SkillsApi(configuration);

let body:.SkillsApiUpdateSkillSkillsSkillIdPutRequest = {
  // string
  skillId: "skill_id_example",
  // SkillSpecification
  skillSpecification: null,
};

apiInstance.updateSkillSkillsSkillIdPut(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **skillSpecification** | **SkillSpecification**|  |
 **skillId** | [**string**] |  | defaults to undefined


### Return type

**SavedSkillSpecification**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [HTTPBearer](README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


