# Documentação da API

## 📋 Sumário
1. [🛠️ Introdução](#️-introdução)
2. [💻 Instalação](#-instalação)
   - [Pré-requisitos](#pré-requisitos)
   - [Configurando o Banco de Dados (Docker)](#configurando-o-banco-de-dados-docker)
   - [Clonando o Repositório e Instalando Dependências](#clonando-o-repositório-e-instalando-dependências)
   - [Configuração do Ambiente](#️-configuração-do-ambiente)
4. [Executando o Projeto](#-executando-o-projeto)
5. [Endpoints e Documentação (Swagger)](#-endpoints-e-documentação-swagger)
   - [Exemplos do Postman](#prints-de-exemplos-do-postman-endpoints-de-planos)
6. [Testes e Resultados](#-testes-e-resultados)
7. [Estrutura do Projeto](#-estrutura-do-projeto)
8. [Funcionalidades](#-funcionalidades)
9. [Erros que tive e soluções](#-erros-comuns-e-soluções)
   - [Violação de Chave Estrangeira ao Excluir Produto](#erro-violação-de-chave-estrangeira-ao-excluir-produto)
   - [Logs para Debugging](#logs-para-debugging)
10. [Conclusão](#-conclusão)

---

## 🛠️ Introdução
Para este desafio, optei por utilizar **Node.js** juntamente com **Nest.js** para a construção da API. A escolha dessas tecnologias foi baseada na minha familiaridade com elas, além de serem ferramentas amplamente utilizadas no mercado, conhecidas por sua escalabilidade, modularidade e eficiência no desenvolvimento de APIs. Foi utilizado o **Prisma ORM** para gerenciar o banco de dados PostgreSQL. Abaixo segue relação do que foi pedido com o que foi concluido:
## 1. Criação de plano
  - &#x2611; Criar novo plano de assinatura
  - &#x2611; Cada plano deve conter pelo menos 1 produto no momento da criação.
  - &#x2611; Produtos possuem os seguintes atributos:
    - &#x2611; ID (gerado automaticamente)
    - &#x2611; Nome (obrigatório)
    - &#x2611; Descrição (opcional)
## 2. Adição de Produtos ao Plano
- &#x2611; Adicionar um produto a um plano existente
## 3. Remoção de Produtos do Plano
- &#x2611; Removerumproduto de um plano existente.
## 4. Exibição de Detalhamento do Plano
- &#x2611; Recuperar os detalhes de um plano, incluindo:
  - &#x2611; Informações gerais do plano.
  - &#x2611; Lista atual de produtos associados ao plano.
  - &#x2611; Histórico de produtos que já foram adicionados e removidos.
## Extras
- &#x2611; Implementação de autenticação básica na API (ex.: autenticação por token).
- &#x2611; Usode testes automatizados cobrindo os principais fluxos da API.
- &#x2611; Logs que registram as ações executadas nos endpoints.
- &#x2611; Paginação na exibição do histórico de produtos adicionados/removidos.

## Extras pessoais
- &#x2611; CRUD completa de produtos.
- &#x2611; Utilização do Swagger para documentação completa do código.
- &#x2611; Utilização do Prisma ORM para a manipulação de dados e um desenvolvimento mais rápido e seguro.
- &#x2611; Utilização do Docker para conteinerização do PostgreSQL.



## 💻 Instalação

### Pré-requisitos
Certifique-se de que você possui (mostrarei a versão para windows):
- [Node.js](https://nodejs.org/) instalado.
- [Docker](https://www.docker.com/) instalado e funcionando.
- [PostgreSQL](https://www.postgresql.org/) (se não for usar Docker).

---

### Configurando o Banco de Dados (Docker)
1. Faça download e instale o [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) caso não tenha.

1. Crie um arquivo `docker-compose.yml`:
   ```yaml
   services:

    db_postgres:
      image: postgres:13.5
      container_name: db_postgres
      restart: always
      environment:
        POSTGRES_USER: ${DB_USER}
        POSTGRES_PASSWORD: ${DB_PASSWORD}
        POSTGRES_DB: ${DB_NAME}
      volumes:
        - postgres:/var/lib/postgresql/data
      ports:
        - '5432:5432'
      networks:
        - app_network

    pgadmin_postgres:
      image: dpage/pgadmin4
      container_name: pgadmin_postgres
      environment:
        PGADMIN_DEFAULT_EMAIL: "jps.tentis@gmail.com"
        PGADMIN_DEFAULT_PASSWORD: "pass"
      ports:
        - "5050:80"
      depends_on:
        - db_postgres
      networks:
        - app_network

    volumes:
      postgres:

    networks:
      app_network:
        driver: bridge
2. Suba o banco de dados com o Docker:
    ```bash
    docker-compose up -d
3. Verifique se o banco está rodando:
    ```bash
    docker ps
    ```

4. Print de como deve ficar
<div align="center">
  <img src="/markdown_assets/image.png" width="80%">
</div>

### Clonando o Repositório e Instalando Dependências
1. Clone o repositório:
```bash
git clone <link-do-repositorio>
cd <nome-do-repositorio>
```

2. Instale as dependências:
```bash
npm install
```
### 🛠️ Configuração do Ambiente
1. Crie um arquivo .env na raiz do projeto:
    - [Link](https://jwtsecret.com/generate) para gerar JWT Token.

```env
  DATABASE_URL='postgresql://postgres:postgres@localhost:5432/vexpanses'
  JWT_SECRET='your_jwt_secret' #gere uma online caso precise
  DB_USER = 'postgres'
  DB_PASSWORD = 'postgres'
  DB_NAME='vexpanses'
```
2. Certifique-se de que a variável DATABASE_URL está correta para o banco de dados.
3. Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

4. Opcionalmente, popule o banco de dados:
```bash
npx prisma db seed
```

<div align="center">
  <img src="/markdown_assets/image-1.png" width="70%">
  <img src="/markdown_assets/image-2.png" width="70%">
</div>

## 🚀 Executando o Projeto

1. Inicie o servidor:
```bash
npm run start:dev
```

2. Acesse a API em:
```bash
http://localhost:4000
```

3. Acesse a documentação Swagger em:
```bash
http://localhost:4000/api
```

<div align="center">
  <img src="/markdown_assets/image-3.png" width="100%">
</div>

## 📜 Endpoints e Documentação (Swagger)
Os principais endpoints disponíveis são:

1. Autenticação:
- POST /auth/login: Autenticar-se com um usuário válido e obter um token JWT.

2. Planos:
    - POST /plans Criar um novo plano.
    - GET /plans Buscar detalhes de todos os planos.
    - GET /plans/{id} Buscar detalhes de um plano.
    - POST /plans/{planId}/products/{productId} Adicionar um produto a um plano.
    - DELETE /plans/{planId}/products/{productId} Remover um produto de um plano.
    - GET /plans/{planId}/history Ver todo histórico com paginação.

3. Produtos:
    - POST /products Criar um novo produto.
    - GET /products Listar um produto especifico.
    - GET /products/{id} Listar todos os produtos.
    - PATCH /products/{id} Atualizar um produto.
    - DELETE /products/{id} Remover um produto.

4. Histórico:
    - GET /plans/:planId/history: Obter o histórico de um plano (com paginação).

### Prints de exemplos do postman (endpoints de planos)
 [Postman Collection](.\markdown_assets\VExpanses_API_Collection.postman_collection.json) para facilitar (basta importar dentro do Postman e fazer download do Postman Agent).

1. Criar plano
![alt text](/markdown_assets/image-5.png)

2. Listar todos os planos
![alt text](/markdown_assets/image-6.png)

3. Listar plano especifico
![alt text](/markdown_assets/image-8.png)

4. Remover produto de plano
![alt text](/markdown_assets/image-10.png)

5. Adicionar produto em plano
![alt text](/markdown_assets/image-9.png)


### 🧪 Testes e Resultados
Os testes foram implementados utilizando supertest para E2E. Para rodar os testes:

```bash
npm run test:e2e
```

- Resultados dos testes:
  - Testes para criação de planos.
  - Testes para adição e remoção de produtos.
  - Validação de histórico.

```json
  {
    "numFailedTestSuites": 0,
    "numFailedTests": 0,
    "numPassedTestSuites": 1,
    "numPassedTests": 5,
    "numPendingTestSuites": 0,
    "numPendingTests": 0,
    "numRuntimeErrorTestSuites": 0,
    "numTodoTests": 0,
    "numTotalTestSuites": 1,
    "numTotalTests": 5,
    "openHandles": [],
    "snapshot": {
        "added": 0,
        "didUpdate": false,
        "failure": false,
        "filesAdded": 0,
        "filesRemoved": 0,
        "filesRemovedList": [],
        "filesUnmatched": 0,
        "filesUpdated": 0,
        "matched": 0,
        "total": 0,
        "unchecked": 0,
        "uncheckedKeysByFile": [],
        "unmatched": 0,
        "updated": 0
    },
    "startTime": 1736899468561,
    "success": true,
    "testResults": [
        {
            "assertionResults": [
                {
                    "ancestorTitles": [
                        "App E2E"
                    ],
                    "duration": 49,
                    "failureDetails": [],
                    "failureMessages": [],
                    "fullName": "App E2E deve criar um novo plano",
                    "invocations": 1,
                    "location": null,
                    "numPassingAsserts": 3,
                    "retryReasons": [],
                    "status": "passed",
                    "title": "deve criar um novo plano"
                },
                {
                    "ancestorTitles": [
                        "App E2E"
                    ],
                    "duration": 19,
                    "failureDetails": [],
                    "failureMessages": [],
                    "fullName": "App E2E deve associar produto em um plano",
                    "invocations": 1,
                    "location": null,
                    "numPassingAsserts": 3,
                    "retryReasons": [],
                    "status": "passed",
                    "title": "deve associar produto em um plano"
                },
                {
                    "ancestorTitles": [
                        "App E2E"
                    ],
                    "duration": 18,
                    "failureDetails": [],
                    "failureMessages": [],
                    "fullName": "App E2E deve deletar um produto de plano",
                    "invocations": 1,
                    "location": null,
                    "numPassingAsserts": 3,
                    "retryReasons": [],
                    "status": "passed",
                    "title": "deve deletar um produto de plano"
                },
                {
                    "ancestorTitles": [
                        "App E2E"
                    ],
                    "duration": 9,
                    "failureDetails": [],
                    "failureMessages": [],
                    "fullName": "App E2E deve criar um novo produto",
                    "invocations": 1,
                    "location": null,
                    "numPassingAsserts": 3,
                    "retryReasons": [],
                    "status": "passed",
                    "title": "deve criar um novo produto"
                },
                {
                    "ancestorTitles": [
                        "App E2E"
                    ],
                    "duration": 9,
                    "failureDetails": [],
                    "failureMessages": [],
                    "fullName": "App E2E deve retornar todos os produtos",
                    "invocations": 1,
                    "location": null,
                    "numPassingAsserts": 2,
                    "retryReasons": [],
                    "status": "passed",
                    "title": "deve retornar todos os produtos"
                }
            ],
            "endTime": 1736899471725,
            "message": "",
            "name": "E:\\desafio_vexpanses\\test\\app.e2e-spec.ts",
            "startTime": 1736899468644,
            "status": "passed",
            "summary": ""
        }
    ],
    "wasInterrupted": false
}
```
Print do console
<div align="center">
  <img src="/markdown_assets/image-4.png" width="100%">
</div>

### 📂 Estrutura do Projeto

```
project
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   ├── schema.test.prisma
│   └── seed.ts
├── src
│   ├── auth
│   │   ├── dto
│   │   │   └── auth.dto.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.controller.spec.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.service.spec.ts
│   │   ├── jwt-auth.guard.ts
│   │   └── jwt.strategy.ts
│   ├── middleware
│   │   └── logging.middleware.ts
│   ├── plan-history
│   │   ├── plan-history.controller.ts
│   │   ├── plan-history.controller.spec.ts
│   │   ├── plan-history.module.ts
│   │   ├── plan-history.service.ts
│   │   └── plan-history.service.spec.ts
│   ├── plans
│   │   ├── dto
│   │   │   └── create-plan.dto.ts
│   │   ├── plans.controller.ts
│   │   ├── plans.controller.spec.ts
│   │   ├── plans.module.ts
│   │   ├── plans.service.ts
│   │   └── plans.service.spec.ts
│   ├── prisma
│   │   ├── prisma.module.ts
│   │   ├── prisma.service.ts
│   │   └── prisma.service.spec.ts
│   ├── products
│   │   ├── dto
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── products.controller.ts
│   │   ├── products.controller.spec.ts
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   └── products.service.spec.ts
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts

```


## 🚀 Funcionalidades
**Validação de Produtos na Criação de Planos**

Antes de criar um plano, a API valida se todos os produtos fornecidos existem no banco de dados. Caso algum produto seja inválido, uma mensagem de erro é retornada.

**Exemplo de Requisição Válida:**

```json
POST /plans
{
  "name": "Plano Claro TV",
  "description": "Plano com todos os recursos da Claro Tv para voce!",
  "productIds": [1, 2, 3]
}
```

Resposta:
```json
{
  "id": 1,
  "name": "Plano Claro TV",
  "description": "Plano com todos os recursos da Claro TV para voce!",
  "products": [
    { "id": 1, "name": "Produto A" },
    { "id": 2, "name": "Produto B" },
    { "id": 3, "name": "Produto C" }
  ]
}
```

Exemplo de Requisição Inválida:
```json
POST /plans
{
  "name": "Plano Vivo Fibra",
  "description": "Plano básico sem muitos recursos.",
  "productIds": [999, 1000]
}
```

Resposta:
```json
{
  "statusCode": 400,
  "message": "Um ou mais produtos fornecidos não existem.",
  "error": "Bad Request"
}
```

## 🔍 Erros Comuns e Soluções
**Erro: Produto Não Encontrado na Criação de Plano**
**Descrição:** Ao criar um plano, o erro "The required connected records were not found" pode aparecer se um produto inválido for fornecido.

**Solução:** A API valida automaticamente os produtos antes de criar o plano e retorna um erro amigável.

### Erro: Violação de Chave Estrangeira ao Excluir Produto
**Descrição:** Quando um produto é excluído, o banco impede a ação devido a referências no histórico.

**Solução:**
- Registre a exclusão no histórico antes de excluir o produto.
- Configure o schema para evitar onDelete: Cascade indesejado.

### Logs para Debugging
A API utiliza o sistema de logs do NestJS para registrar ações importantes, como:

- Criação de planos.
- Adição ou remoção de produtos.
- Validação de entradas e erros.

## 🔗 Conclusão
O projeto poderia ser expandido de diversas formas: integrando a um frontend com UI/UX moderna, criando um controle de acesso avançado (com niveis de hierarquia) e expandir funcionalidades. Foi um projeto divertido de fazer, já tive contato com todas as tecnologias utilizadas, então gostei bastante de fazer. Além das minhas dificuldades que foram listadas acima, também tive problema com tempo, estou finalizando meu TCC e preciso entregar logo, então tentei fazer da melhor maneira possível dentro do que foi pedido e mais algumas coisinhas. Espero que tenham gostado do meu projeto. 