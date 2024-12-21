<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Comandos Banco de Dados

### Migrations
Para criar uma migration:
```powershell
  npm run migrations:create -- --name add-coluna-exemplo
```

Para rodar a migration:
```powershell
  npm run migrations:run
```
voltar a migration:

```powershell
  npm run migrations:undo
```
## Comandos para rodar o banco com docker

Caso não queira instalar tanto o mysql como o mongo em sua máquina você pode utilizar o docker para buildar uma imagem para você.
Para tornar mais fácil esse processo, já foi deixado um arquivo de configuração pronto para isso, ele cria um container no docker com a imagem do mysql e do mongo.

Atualmente veja o que já está e o que não está configurado para rodar no container:
  
  + Imagem do Mysql;
  + Imagem do MongoDB;
  + Script de criação do banco e das tabelas;
      * tabela de heroes;
      * tabela de studios;
      * tabela de team;

As váriaveis de acesso ao banco mysql e mongoDB para o docker já estão configuradas no abaixo, só comentar as outras e colar as abaixo no arquivo "**.env**":
```
  # dados para utilizar o banco mysql com docker
  DB_HOST=mysql              # Nome do serviço no docker-compose.yml
  DB_PORT=3306               # Porta padrão do MySQL
  DB_USERNAME=admin          # O usuário configurado no MYSQL_USER
  DB_PASSWORD=admin1234      # A senha configurada no MYSQL_PASSWORD
  DB_NAME=HeroesPlataform    # O banco de dados configurado no MYSQL_DATABASE

  # dados para utilizar o banco mongo DB com docker
  MONGO_HOST=mongodb                  # Nome do serviço MongoDB no docker-compose.yml
  MONGO_PORT=27017                    # Porta padrão do MongoDB
  MONGO_INITDB_ROOT_USERNAME=root     # Usuário raiz definido no Compose
  MONGO_INITDB_ROOT_PASSWORD=rootpassword # Senha raiz configurada no Compose
```

### Como utilizar o docker para subir as imagens e usar o banco?
Simples, primeiro instale o docker desktop em sua máquina ou em uma vm para usar com o linux, link do docker: [Docker](https://www.docker.com/);

Após a instalação rode o comando a seguir no seu terminal no diretório do repositório:
```
  docker-compose up -d
```
O comando a cima irá provisionar tudo o que você precisa para usar sua aplicação com o banco de dados.

Se quiser verificar se realmente o banco está tudo certo digite os comandos abaixo:
  + verifica os dados e o estados dos containers criados:
  ```
    docker ps
  ```
  + Acessa o MySQL para verificar se o banco foi criado e funcional:
  ```
    docker exec -it mysql_container mysql -u root -p
  ``` 
  Digite a senha root123456

  + Liste os bancos de dados:
  ```
    SHOW DATABASES;
  ```
  + Use o banco criado:
  ```
   USE HeroesPlataform;
  ```
  + Liste as tabelas:
  ```
    SHOW TABLES;
  ```
  + para sair:
  ```
    exit
  ```

### Como para de rodar o meu container?

Pode haver a necessidade de para seus container após finalizar o densenvolvimento, para isso execute o comando para parar todos os containers que estão rodando:
```
  docker stop $(docker ps -q)
```
ou o comando:
```
  docker compose down
```
qual a diferença o comando "docker stop $(docker ps -q)" para o container e permanece com o mesmo estado e quando você rodar o comando "docker-compose up -d" ele só vai restartar o container, mas se utilizar o comando "docker compose down" ele mata o container e quando rodar "docker-compose up -d" ele reinstala tudo novamente, mas fique tranquilo que foi deixado um volume na criação, então os dados inseridos no banco persistem.

Qualquer dúvida chame o ADM do projeto: Diego de Souza.

## Para rodar o banco de forma Local

Para rodar o banco de forma local você deve instalar o mysql em seu computador:
Passos:
  
  1° - Baixe o Mysql;
    * Vá até o site oficial do MySQL: https://dev.mysql.com/downloads/installer/.
    *Faça o download do MySQL Installer adequado para o seu sistema operacional.
  
  2° - Instale o MySQL:
    * Execute o instalador e siga as instruções:
    obs.: Para mais detalhes procure na codumentação no próprio site.
  
  3° - Verifique a instalação do Mysql:
    * abra o terminal e digite o comando:
      ```
        mysql --version
      ```
  
  4° - Se conecte ao banco:
    No terminal digite:
      ```
        mysql -u root -p
      ```
      Depois insira a senha

  5° - Crie o banco: 
    * Digite o comando:

      ```
        CREATE DATABASE HeroesPlataform;
      ```

  6° - crie o usuario adm:
    * Digite o comando:

    ```
      CREATE USER 'admin'@'%' IDENTIFIED BY 'admin1234';
    ```

  7° - Conceda os privilégios de acesso ao banco, caso contrário os dados do .env não vão funcionar.
    * Digite o comando:

    ```
      GRANT ALL PRIVILEGES ON HeroesPlataform.* TO 'admin'@'%';
    ```

  8° - Atualize as permissões:
    * Digite o comando: 

    ```
      FLUSH PRIVILEGES;
    ```

  Use o banco criado:
    * Digite o comando:

    ```
      USE HeroesPlataform;
    ```
  Crie as tabelas:
    * Digite o comando:

    ```
      -- Criar a tabela "studios"
      CREATE TABLE IF NOT EXISTS studios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          nationality VARCHAR(50),
          history VARCHAR(255)
      );

      -- Criar a tabela "team"
      CREATE TABLE IF NOT EXISTS team (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          creator VARCHAR(50)
      );

      -- Criar a tabela "heroes"
      CREATE TABLE IF NOT EXISTS heroes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          studio_id INT NOT NULL,
          power_type VARCHAR(50),
          morality VARCHAR(50),
          first_appearance VARCHAR(255),
          release_date DATE,
          creator VARCHAR(50),
          weak_point VARCHAR(100),
          affiliation VARCHAR(100),
          story VARCHAR(255),
          team INT,
          genre VARCHAR(50),
          image1 BLOB,
          image2 BLOB,
          FOREIGN KEY (studio_id) REFERENCES studios(id),
          FOREIGN KEY (team) REFERENCES team(id)
      );
    ```
Pronto configurado pelo terminal.
Obs.: Aconselho usar um gerenciador de banco como o Mysql workBench, é mais fácil de visualizar o resultado e tem uma interface gráfica, mais amigavel para iniciantes.
os comando são praticamente os mesmos para criação do banco e etc.