# .ProvidersApi

All URIs are relative to *http://127.0.0.1:5001/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**connectProviderProvidersProviderPost**](ProvidersApi.md#connectProviderProvidersProviderPost) | **POST** /providers/{provider} | Connect Provider
[**disconnectProviderProvidersProviderDelete**](ProvidersApi.md#disconnectProviderProvidersProviderDelete) | **DELETE** /providers/{provider} | Disconnect Provider
[**getProviderProvidersProviderGet**](ProvidersApi.md#getProviderProvidersProviderGet) | **GET** /providers/{provider} | Get Provider
[**listProvidersProvidersGet**](ProvidersApi.md#listProvidersProvidersGet) | **GET** /providers | List Providers
[**optionsProvidersOptions**](ProvidersApi.md#optionsProvidersOptions) | **OPTIONS** /providers | Options
[**optionsProvidersProviderOptions**](ProvidersApi.md#optionsProvidersProviderOptions) | **OPTIONS** /providers/{provider} | Options


# **connectProviderProvidersProviderPost**
> ModelProviderConnection connectProviderProvidersProviderPost(modelConnection)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .ProvidersApi(configuration);

let body:.ProvidersApiConnectProviderProvidersProviderPostRequest = {
  // string
  provider: "provider_example",
  // ModelConnection
  modelConnection: {
    apiKey: "apiKey_example",
  },
};

apiInstance.connectProviderProvidersProviderPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **modelConnection** | **ModelConnection**|  |
 **provider** | [**string**] |  | defaults to undefined


### Return type

**ModelProviderConnection**

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

# **disconnectProviderProvidersProviderDelete**
> ModelProviderConnection disconnectProviderProvidersProviderDelete()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .ProvidersApi(configuration);

let body:.ProvidersApiDisconnectProviderProvidersProviderDeleteRequest = {
  // string
  provider: "provider_example",
};

apiInstance.disconnectProviderProvidersProviderDelete(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | [**string**] |  | defaults to undefined


### Return type

**ModelProviderConnection**

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

# **getProviderProvidersProviderGet**
> ModelProviderConnection getProviderProvidersProviderGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .ProvidersApi(configuration);

let body:.ProvidersApiGetProviderProvidersProviderGetRequest = {
  // string
  provider: "provider_example",
};

apiInstance.getProviderProvidersProviderGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | [**string**] |  | defaults to undefined


### Return type

**ModelProviderConnection**

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

# **listProvidersProvidersGet**
> Array<ModelProviderConnection> listProvidersProvidersGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .ProvidersApi(configuration);

let body:any = {};

apiInstance.listProvidersProvidersGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<ModelProviderConnection>**

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

# **optionsProvidersOptions**
> any optionsProvidersOptions()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .ProvidersApi(configuration);

let body:any = {};

apiInstance.optionsProvidersOptions(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **optionsProvidersProviderOptions**
> any optionsProvidersProviderOptions()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .ProvidersApi(configuration);

let body:.ProvidersApiOptionsProvidersProviderOptionsRequest = {
  // string
  provider: "provider_example",
};

apiInstance.optionsProvidersProviderOptions(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | [**string**] |  | defaults to undefined


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


