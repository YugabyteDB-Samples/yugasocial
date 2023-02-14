# Local Docker Deployment

Follow this instruction if you wish to run the entire application with all the components on your local machine using Docker and Docker-Compose.

<!-- vscode-markdown-toc -->

- [Local Docker Deployment](#local-application-deployment)
  - [Prerequisites](#prerequisites)
  - [Architecture](#architecture)
  - [Run Application Services](#run-application-services)
    - [Running on YugabyteDB within Docker](#running-on-yugabytedb-within-docker)
    - [Running on YugabyteDB Managed or Custom YugabyteDB Deployment](#running-on-yugabytedb-managed-or-custom-yugabytedb-deployment)
    - [Running on Custom MySQL Deployment](#running-on-custom-mysql-deployment)
    - [Running on MySQL within Docker](#running-on-mysql-within-docker)
  - [Seed Database](#seed-database)
  - [Viewing The UI](#viewing-the-ui)

<!-- vscode-markdown-toc-config
    numbering=false
    autoSave=true
    /vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## Prerequisites

- Install [Docker and Docker Desktop](https://docs.docker.com/get-docker/)

## Architecture

- Frontend - ReactJS
- Backend Services - Node.js
- Database - YugabyteDB or MySQL
- Infrastructure - Docker / Docker-Compose

## Run Application Services

This deployment option runs application services locally via [Docker-Compose](https://docs.docker.com/compose/).

Users have the option to connect these services to YugabyteDB or MySQL.

These database deployments can be hosted in the cloud, with [YugabyteDB Managed](https://www.yugabyte.com/managed/) for YugabyteDB or any other cloud provider for MySQL. Alternatively, YugabyteDB or MySQL can be hosted within Docker.

#### **Running on YugabyteDB Managed or Custom YugabyteDB Deployment**

1. Open the `docker-compose-yugabyte.yaml` file and provide the connection details via the `DB_` settings.

2. Start the application:

```
docker compose -f docker-compose-yugabyte.yaml up
```

#### **Running on YugabyteDB within Docker**

This is a self-contained deployment, which doesn't require any additional configuration.

1. Start the application:

```
docker compose -f docker-compose-yugabyte-local.yaml up
```

2. View the YugabyteDB UI Console at [localhost:7001](http://localhost:7001).

<img width="1584" alt="Screen Shot 2022-11-02 at 7 36 17 PM" src="https://user-images.githubusercontent.com/2041330/199637751-616d19ff-e474-4d17-956c-fe672c53052c.png">

#### **Running on Custom MySQL Deployment**

1. Open the `docker-compose-mysql.yaml` file and provide the connection details via the `DB_` settings.

2. Start the application:

```
docker compose -f docker-compose-mysql.yaml up
```

#### **Running on MySQL within Docker**

This is a self-contained deployment, which doesn't require any additional configuration.

Start the application:

```
docker compose -f docker-compose-mysql-local.yaml up
```

## Seed Database

Fully Dockerized deployments will seed the database automatically.

For custom database deployments:

1. Find the schema and data files in `/api/schema` and `/api/data`.
2. Install the appropriate command-line utility for your database. For YugabyteDB, install [ysqlsh](https://docs.yugabyte.com/preview/admin/ysqlsh) and for MySQL, install [mysql](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-install.html) shell.
3. Execute the files.

```
# Yugabyte
> ysqlsh -h 127.0.0.1 -p 5433 -U yugabyte -f ./api/schema/postgres.sql
> ysqlsh -h 127.0.0.1 -p 5433 -U yugabyte -f ./api/data/users.sql
> ysqlsh -h 127.0.0.1 -p 5433 -U yugabyte -f ./api/data/posts.sql
> ysqlsh -h 127.0.0.1 -p 5433 -U yugabyte -f ./api/data/comments.sql
> ysqlsh -h 127.0.0.1 -p 5433 -U yugabyte -f ./api/data/relationships.sql
> ysqlsh -h 127.0.0.1 -p 5433 -U yugabyte -f ./api/data/likes.sql
> ysqlsh -h 127.0.0.1 -p 5433 -U yugabyte -f ./api/data/stories.sql

#MySQL
> mysql -h 127.0.0.1 -u user social < ./api/schema/mysql.sql
> mysql -h 127.0.0.1 -u user social < ./api/data/users.sql
> mysql -h 127.0.0.1 -u user social < ./api/data/posts.sql
> mysql -h 127.0.0.1 -u user social < ./api/data/comments.sql
> mysql -h 127.0.0.1 -u user social < ./api/data/relationships.sql
> mysql -h 127.0.0.1 -u user social < ./api/data/likes.sql
> mysql -h 127.0.0.1 -u user social < ./api/data/stories.sql
```

## Viewing the UI

The application UI can be found at [localhost:3000](http://localhost:3000).

1. Log in with the default username and password: `tomthomas` / `abc123`. Alternatively, you can register your own user.
2. After logging in, begin interacting with others on YugaSocial!
