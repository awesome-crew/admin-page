# Awesome.dev 기본 어드민 템플릿

## 필요 엔드포인트

### 1. auth

1. `<API_URL>/auth/sign-in` **POST**
   - request body: code, email
2. `<API_URL>/auth/verify` **GET**

### 3. model별로

1. `<API_URL>/<modal_name>?offset=<offset>&limit=<limit>` **GET**
2. `<API_URL>/<modal_name>/[id]` **GET**
3. `<API_URL>/<modal_name>` **POST**
4. `<API_URL>/<modal_name>[id]` **PATCH**
