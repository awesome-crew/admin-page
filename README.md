# Awesome.dev 기본 어드민 템플릿

## 필요 엔드포인트

### 1. auth

1. `<API_URL>/auth/sign-in` **POST**
   - request body: code, password
2. `<API_URL>/auth/verify` **GET**

### 2. common

1. `<API_URL>/common/upload` **POST**

### 3. model별로

1. `<API_URL>/<modal_name>?offset=<offset>&limit=<limit>` **GET**
2. `<API_URL>/<modal_name>/count` **GET**
3. `<API_URL>/<modal_name>/[id]` **GET**
4. (optional) `<API_URL>/<modal_name>` **POST**
5. (optional) `<API_URL>/<modal_name>[id]` **PATCH**
6. (optional) `<API_URL>/<modal_name>[id]` **DELETE**
