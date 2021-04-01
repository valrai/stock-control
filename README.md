# Controle de Estoque

### Descrição

Projeto referente a um gerenciador de estoque para lojas de roupas.

### Tecnologias e Ferramentas

* [Nestjs](https://nestjs.com) - Framework Node.js para a construção de aplicações server-side.
* [PostgreSQL](https://www.docker.com) - Banco de dados relacional open source.
* [Docker](https://www.docker.com) - Plataforma de serviços de virtualização no nível do sistema operacional.
* [Jest](https://jestjs.io) - Framework Javascript para construção de testes.
* [Swagger](https://swagger.io) - Ferramenta para desenvolvimento de OpenAPI Specification (OAS).

### Instalações

Para a execução do projeto é necessário: 

* [NodeJS](https://nodejs.org/pt-br/download/package-manager) v12.18.3 (ou superior)

* [Docker Compose](https://docs.docker.com/compose/install) v1.27.4 (ou superior)

### Executando o Projeto

Após clonar o projeto inicie um terminal no diretório raiz da aplicação, em seguida realize o download das dependências com o comando:

```sh
$ npm install
```

Em seguida inicialize uma instância do banco de dados através do docker compose com o comando: 

```sh
$ docker-compose up -d
```

Após o container concluir sua inicialização será necessário aplicar as migrações do banco de dados, através do comando:

```sh
$ npm run apply-migrations
```

Com as migrações aplicadas no banco de dados, já será possível preenchê-lo com os dados de iniciais através do comando:

```sh
$ npm run seed
```
Com isso você será capaz de se autenticar com o usuário administrador (username: adm, senha 123456) e criar novos usuários.
Por fim, basta iniciar o servidor da API (http://localhost:8080) com o comando: 

```sh
$ npm start
```

Após a aplicação iniciar, acesse http://localhost:8080/docs para ter acesso a página de documetação da API com a listagem de todos os endpoints.

### Autor

* [Valdecir Raimundo](https://github.com/valrai)
