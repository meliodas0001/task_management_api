# Task Management Api

Task Management Api, é uma api simples de gerenciamento de tarefas, parecido com o trello. A aplicação permite a criação de Grupos e de Pastas para gerenciar suas tarefas. E também possuí um gerenciamento de usuários.

### Iniciar aplicação

Crie um arquivo **`.env`** na pasta do projeto, e preencha todas as informações de acordo com o arquivo **`.example.env`**

## Criando Instância de Banco de Dados com Docker

Para iniciar a database com docker é preciso do software docker instalado e configurado em seu computador. Após a instalação do docker, entre na pasta raiz do projeto e execute o comando **`docker-compose up`**

## Criação de tabelas no banco de dados

Para criar todas tabelas no banco de dados utilize o comando **`npm prisma db push`** ou **`yarn prisma db push`**

## Rodando a aplicação

```bash
yarn start
# ou
npm start
```

### Testar rotas da aplicação

Para testar as rotas da aplicação você pode usar o arquivo [arquivo de rotas](./task_management_api-InsomniaAPI) no aplicativo do Insomnia.

### Create

| Rota              | Tipo de requisição |
| ----------------- | ------------------ |
| **`auth/create`** | **`Post`**         |

**Exemplo de requisição**

| Campo          | Tipo         | Descrição        |
| -------------- | ------------ | ---------------- |
| **`username`** | **`String`** | Nome do usuário  |
| **`password`** | **`String`** | Senha do usuário |
| **`email`**    | **`String`** | Email do usuário |

**Tipo de retorno**

201 - Created

## Login

| Rota             | Tipo de requisição |
| ---------------- | ------------------ |
| **`auth/login`** | **`Post`**         |

**Exemplo de requisição**

| Campo          | Tipo         | Descrição        |
| -------------- | ------------ | ---------------- |
| **`email`**    | **`String`** | Email do usuário |
| **`password`** | **`String`** | Senha do usuário |

**Tipo de retorno**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZW1haWwuY29tIiwidXNlcm5hbWUiOiJKb2huIERvZSIsImlkIjoiMGI3NzY4MDMtOWM0My00NWFlLThmY2QtYTQ3MTY5NDBjMTAyIiwiaWF0IjoxNzIwNzE2MDMwfQ.aflGUj-tnTWMvOmWGD4etxhJCeN0eqVrhJ8rKwmFktc"
}
```

### Rota dos Containers

**Todas requestes da rota Containers deve conter o campo authorization no header para utilizar a request**

## Create

| Rota                    | Tipo de requisição |
| ----------------------- | ------------------ |
| **`containers/create`** | **`Post`**         |

**Exemplo de requisição**

| Campo             | Tipo         | Descrição              |
| ----------------- | ------------ | ---------------------- |
| **`name`**        | **`String`** | Nome do container      |
| **`description`** | **`String`** | Descrição do container |

**Tipo de retorno**

201 - Created

## Get All User Containers

| Rota                 | Tipo de requisição |
| -------------------- | ------------------ |
| **`containers/all`** | **`GET`**          |

**Para a realização da request é necessário somente o campo authorization no header com o token jwt**

**Tipo de retorno**

```json
[
  {
    "id": "c87561f2-2a1c-4d12-900d-3ff2291d2c33",
    "name": "Container atualizado",
    "description": "Descrição atualizada",
    "ownerId": "0b776803-9c43-45ae-8fcd-a4716940c102",
    "isPublic": true
  }
]
```

## Find Container By Id

| Rota                      | Tipo de requisição |
| ------------------------- | ------------------ |
| **`containers/findById`** | **`GET`**          |

**Exemplo de requisição**

| Campo             | Tipo         | Descrição       |
| ----------------- | ------------ | --------------- |
| **`containerId`** | **`String`** | Id do container |

**Tipo de retorno**

```json
{
  "id": "c87561f2-2a1c-4d12-900d-3ff2291d2c33",
  "name": "Container atualizado",
  "description": "Descrição atualizada",
  "ownerId": "0b776803-9c43-45ae-8fcd-a4716940c102",
  "isPublic": true,
  "users": [
    {
      "id": "0b776803-9c43-45ae-8fcd-a4716940c102",
      "username": "John Doe",
      "email": "johndoe@email.com"
    }
  ]
}
```

## Update User Role

| Rota                              | Tipo de requisição |
| --------------------------------- | ------------------ |
| **`containers/update/user/role`** | **`PUT`**          |

**Exemplo de requisição**

| Campo             | Tipo         | Descrição                                           |
| ----------------- | ------------ | --------------------------------------------------- |
| **`containerId`** | **`String`** | Id do container                                     |
| **`userId`**      | **`String`** | Id do usuário que vai ser atualizado                |
| **`userRole`**    | **`String`** | Role do usuário, pode ser: (Admin, Moderator, User) |

**Tipo de retorno**

200 - Success

## Add User

| Rota                      | Tipo de requisição |
| ------------------------- | ------------------ |
| **`containers/add/user`** | **`PUT`**          |

**Exemplo de requisição**

| Campo             | Tipo         | Descrição                            |
| ----------------- | ------------ | ------------------------------------ |
| **`containerId`** | **`String`** | Id do container                      |
| **`userId`**      | **`String`** | Id do usuário que vai ser adicionado |

**Tipo de retorno**

200 - Success

## Update container

| Rota                    | Tipo de requisição |
| ----------------------- | ------------------ |
| **`containers/update`** | **`PUT`**          |

**Exemplo de requisição**

| Campo             | Tipo          | Descrição                  |
| ----------------- | ------------- | -------------------------- |
| **`containerId`** | **`String`**  | Id do container            |
| **`name`**        | **`String`**  | Nome do container          |
| **`description`** | **`String`**  | Descrição do container     |
| **`isPublic`**    | **`Boolean`** | Deixar o container publico |

**Tipo de retorno**

200 - Success

## Remove User

| Rota                         | Tipo de requisição |
| ---------------------------- | ------------------ |
| **`containers/remove/user`** | **`PATCH`**        |

**Exemplo de request**

| Campo             | Tipo         | Descrição       |
| ----------------- | ------------ | --------------- |
| **`containerId`** | **`String`** | Id do container |
| **`userId`**      | **`String`** | Id do usuário   |

**Tipo de retorno**

200 - Success

## Delete Container

| Rota                    | Tipo de requisição |
| ----------------------- | ------------------ |
| **`containers/delete`** | **`DELETE`**       |

**Exemplo de request**

| Campo             | Tipo         | Descrição       |
| ----------------- | ------------ | --------------- |
| **`containerId`** | **`String`** | Id do container |

**Tipo de retorno**

200 - Success

### Rotas de Folders

**Todas requestes da rota Containers deve conter o campo authorization no header para utilizar a request**

## Create Folder

| Rota                            | Tipo de requisição |
| ------------------------------- | ------------------ |
| **`containers/folders/create`** | **`POST`**         |

**Exemplo de request**

| Campo             | Tipo         | Descrição          |
| ----------------- | ------------ | ------------------ |
| **`containerId`** | **`String`** | Id do container    |
| **`name`**        | **`String`** | Nome da Pasta      |
| **`description`** | **`String`** | Descrição da pasta |

**Tipo de retorno**

201 - Created

## Update Folder

| Rota                            | Tipo de requisição |
| ------------------------------- | ------------------ |
| **`containers/folders/update`** | **`PUT`**          |

**Exemplo de request**

| Campo             | Tipo         | Descrição          |
| ----------------- | ------------ | ------------------ |
| **`containerId`** | **`String`** | Id do container    |
| **`name`**        | **`String`** | Nome da Pasta      |
| **`description`** | **`String`** | Descrição da pasta |
| **`id`**          | **`String`** | Id da pasta        |

**Tipo de retorno**

200 - Success

## Delete Folder

| Rota                            | Tipo de requisição |
| ------------------------------- | ------------------ |
| **`containers/folders/delete`** | **`DELETE`**       |

**Exemplo de request**

| Campo             | Tipo         | Descrição       |
| ----------------- | ------------ | --------------- |
| **`containerId`** | **`String`** | Id do container |
| **`folderId`**    | **`String`** | Id da pasta     |

**Tipo de retorno**

200 - Success

## Find Many Folders

| Rota                              | Tipo de requisição |
| --------------------------------- | ------------------ |
| **`containers/folders/findMany`** | **`GET`**          |

**Exemplo de Request**

| Campo             | Tipo         | Descrição       |
| ----------------- | ------------ | --------------- |
| **`containerId`** | **`String`** | Id do container |

**Tipo de retorno**

```json
[
  {
    "id": "0900512c-5315-4436-bab6-6e91bfbbd6a8",
    "name": "new name",
    "description": "new description",
    "containerId": "c87561f2-2a1c-4d12-900d-3ff2291d2c33",
    "createdAt": "2024-07-09T17:23:39.881Z",
    "author": "John Doe"
  }
]
```

### Tasks Routes

**Todas requestes da rota Containers deve conter o campo authorization no header para utilizar a request**

## Create Task

| Rota                                  | Tipo de requisição |
| ------------------------------------- | ------------------ |
| **`containers/folders/tasks/create`** | **`POST`**         |

**Exemplo de request**

| Campo             | Tipo         | Descrição                               |
| ----------------- | ------------ | --------------------------------------- |
| **`containerId`** | **`String`** | Id do container                         |
| **`folderId`**    | **`String`** | Id da pasta                             |
| **`name`**        | **`String`** | Nome da task                            |
| **`description`** | **`String`** | Descrição da task                       |
| **`status`**      | **`String`** | Tipo de status (Open, InProgress, Done) |

**Tipo de retorno**

201 - Created

## Update Task

| Rota                                  | Tipo de requisição |
| ------------------------------------- | ------------------ |
| **`containers/folders/tasks/update`** | **`PUT`**          |

**Exemplo de request**

| Campo             | Tipo         | Descrição                               |
| ----------------- | ------------ | --------------------------------------- |
| **`containerId`** | **`String`** | Id do container                         |
| **`folderId`**    | **`String`** | Id da pasta                             |
| **`id`**          | **`String`** | Id da task                              |
| **`title`**       | **`String`** | Nome da task                            |
| **`description`** | **`String`** | Descrição da task                       |
| **`status`**      | **`String`** | Tipo de status (Open, InProgress, Done) |

**Tipo de retorno**

200 - Success

## Find Many Tasks

| Rota                                    | Tipo de requisição |
| --------------------------------------- | ------------------ |
| **`containers/folders/tasks/findMany`** | **`GET`**          |

**Exemplo de request**

| Campo          | Tipo         | Descrição   |
| -------------- | ------------ | ----------- |
| **`folderId`** | **`String`** | Id da pasta |

**Tipo de retorno**

```json
[
  {
    "id": "8ad8d009-d9a4-4515-ac02-b183be2aea07",
    "name": "First Task",
    "description": "First description task",
    "folderId": "0900512c-5315-4436-bab6-6e91bfbbd6a8",
    "author": "John Doe",
    "createdAt": "2024-07-09T17:31:42.710Z",
    "status": "Open"
  }
]
```

## Delete Task

| Rota                                  | Tipo de requisição |
| ------------------------------------- | ------------------ |
| **`containers/folders/tasks/delete`** | **`DELETE`**       |

**Exemplo de request**

| Campo             | Tipo         | Descrição       |
| ----------------- | ------------ | --------------- |
| **`containerId`** | **`String`** | Id do container |
| **`taskId`**      | **`String`** | Id da task      |

**Tipo de retorno**

200 - Success
