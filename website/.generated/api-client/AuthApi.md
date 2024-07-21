# .AuthApi

All URIs are relative to *http://127.0.0.1:5001/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createApiKeyAuthApiKeyPost**](AuthApi.md#createApiKeyAuthApiKeyPost) | **POST** /auth/api-key | Create Api Key
[**deleteApiKeyAuthApiKeyKeyIdDelete**](AuthApi.md#deleteApiKeyAuthApiKeyKeyIdDelete) | **DELETE** /auth/api-key/{key_id} | Delete Api Key
[**getApiKeyAuthApiKeyKeyIdGet**](AuthApi.md#getApiKeyAuthApiKeyKeyIdGet) | **GET** /auth/api-key/{key_id} | Get Api Key
[**getAuthenticatedUserAuthGet**](AuthApi.md#getAuthenticatedUserAuthGet) | **GET** /auth | Get Authenticated User


# **createApiKeyAuthApiKeyPost**
> SecretApiKey createApiKeyAuthApiKeyPost(apiKey)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AuthApi(configuration);

let body:.AuthApiCreateApiKeyAuthApiKeyPostRequest = {
  // ApiKey
  apiKey: {
    name: "name_example",
  },
};

apiInstance.createApiKeyAuthApiKeyPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **apiKey** | **ApiKey**|  |


### Return type

**SecretApiKey**

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

# **deleteApiKeyAuthApiKeyKeyIdDelete**
> string deleteApiKeyAuthApiKeyKeyIdDelete()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AuthApi(configuration);

let body:.AuthApiDeleteApiKeyAuthApiKeyKeyIdDeleteRequest = {
  // string
  keyId: "key_id_example",
};

apiInstance.deleteApiKeyAuthApiKeyKeyIdDelete(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **keyId** | [**string**] |  | defaults to undefined


### Return type

**string**

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

# **getApiKeyAuthApiKeyKeyIdGet**
> SavedApiKey getApiKeyAuthApiKeyKeyIdGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AuthApi(configuration);

let body:.AuthApiGetApiKeyAuthApiKeyKeyIdGetRequest = {
  // string
  keyId: "key_id_example",
};

apiInstance.getApiKeyAuthApiKeyKeyIdGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **keyId** | [**string**] |  | defaults to undefined


### Return type

**SavedApiKey**

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

# **getAuthenticatedUserAuthGet**
> FirebaseUser getAuthenticatedUserAuthGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AuthApi(configuration);

let body:any = {};

apiInstance.getAuthenticatedUserAuthGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**FirebaseUser**

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


