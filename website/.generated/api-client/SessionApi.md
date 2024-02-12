# .SessionApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createSessionSessionPost**](SessionApi.md#createSessionSessionPost) | **POST** /session | Create Session
[**getSummarySessionSessionIdGet**](SessionApi.md#getSummarySessionSessionIdGet) | **GET** /session/{session_id} | Get Summary
[**listSessionsSessionsGet**](SessionApi.md#listSessionsSessionsGet) | **GET** /sessions | List Sessions
[**sendMessageSessionSessionIdPost**](SessionApi.md#sendMessageSessionSessionIdPost) | **POST** /session/{session_id} | Send Message


# **createSessionSessionPost**
> SavedSessionSpecification createSessionSessionPost(sessionSpecification)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SessionApi(configuration);

let body:.SessionApiCreateSessionSessionPostRequest = {
  // SessionSpecification
  sessionSpecification: null,
};

apiInstance.createSessionSessionPost(body).then((data:any) => {
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

# **getSummarySessionSessionIdGet**
> Session getSummarySessionSessionIdGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SessionApi(configuration);

let body:.SessionApiGetSummarySessionSessionIdGetRequest = {
  // string
  sessionId: "session_id_example",
};

apiInstance.getSummarySessionSessionIdGet(body).then((data:any) => {
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

[HTTPBearer](README.md#HTTPBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **sendMessageSessionSessionIdPost**
> Session sendMessageSessionSessionIdPost()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SessionApi(configuration);

let body:.SessionApiSendMessageSessionSessionIdPostRequest = {
  // string
  sessionId: "session_id_example",
  // string (optional)
  body: "body_example",
};

apiInstance.sendMessageSessionSessionIdPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **string**|  |
 **sessionId** | [**string**] |  | defaults to undefined


### Return type

**Session**

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


