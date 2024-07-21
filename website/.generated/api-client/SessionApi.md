# .SessionApi

All URIs are relative to *http://127.0.0.1:5001/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createSessionSessionsPost**](SessionApi.md#createSessionSessionsPost) | **POST** /sessions | Create Session
[**getSummarySessionsSessionIdGet**](SessionApi.md#getSummarySessionsSessionIdGet) | **GET** /sessions/{session_id} | Get Summary
[**listSessionsSessionsGet**](SessionApi.md#listSessionsSessionsGet) | **GET** /sessions | List Sessions
[**sendMessageSessionsSessionIdPost**](SessionApi.md#sendMessageSessionsSessionIdPost) | **POST** /sessions/{session_id} | Send Message


# **createSessionSessionsPost**
> SavedSessionSpecification createSessionSessionsPost(sessionSpecification)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SessionApi(configuration);

let body:.SessionApiCreateSessionSessionsPostRequest = {
  // SessionSpecification
  sessionSpecification: {
    agents: [
      "agents_example",
    ],
  },
};

apiInstance.createSessionSessionsPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sessionSpecification** | **SessionSpecification**|  |


### Return type

**SavedSessionSpecification**

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

# **getSummarySessionsSessionIdGet**
> Session getSummarySessionsSessionIdGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SessionApi(configuration);

let body:.SessionApiGetSummarySessionsSessionIdGetRequest = {
  // string
  sessionId: "session_id_example",
};

apiInstance.getSummarySessionsSessionIdGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sessionId** | [**string**] |  | defaults to undefined


### Return type

**Session**

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

# **listSessionsSessionsGet**
> Array<Session> listSessionsSessionsGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SessionApi(configuration);

let body:any = {};

apiInstance.listSessionsSessionsGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<Session>**

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

# **sendMessageSessionsSessionIdPost**
> Session sendMessageSessionsSessionIdPost(messageContentModel)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SessionApi(configuration);

let body:.SessionApiSendMessageSessionsSessionIdPostRequest = {
  // string
  sessionId: "session_id_example",
  // MessageContentModel
  messageContentModel: {
    content: "content_example",
    role: "role_example",
  },
};

apiInstance.sendMessageSessionsSessionIdPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **messageContentModel** | **MessageContentModel**|  |
 **sessionId** | [**string**] |  | defaults to undefined


### Return type

**Session**

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


