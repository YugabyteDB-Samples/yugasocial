# Local Manual Deployment

Follow this instruction if you wish to run the application components locally without Docker.

<!-- vscode-markdown-toc -->

- [Local Application Deployment](#local-application-deployment)
  - [Prerequisites](#prerequisites)
  - [Architecture](#architecture)
  - [Configure Your Environment](#configure-your-environment)
  - [Run Application Services](#run-application-services)
  - [Seed Database](#seed-database)
  - [Viewing The UI](#viewing-the-ui)

<!-- vscode-markdown-toc-config
    numbering=false
    autoSave=true
    /vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## Prerequisites

- Ensure your system is equipped to run JavaScript applications with Node.js v16.

## Architecture

- Frontend - ReactJS
- Backend Services - Node.js
- Database - YugabyteDB or MySQL

## Configure Your Environment

YugaSocial uses the [Dotenv](https://www.npmjs.com/package/dotenv) package configure it's application environment.

1. Install the server dependencies

```
> cd api/ && npm install
```

2. Edit your database connection details in `/api/.env`.
3. Install the client dependencies

```
> cd client/ && npm install
```

4. Build the UI

```
> npm run build
```

## Run Application Services

This application runs locally via a Node.js server.

Users have the option to connect these services to YugabyteDB or MySQL.

These database deployments can be hosted in the cloud, with [YugabyteDB Managed](https://www.yugabyte.com/managed/) for YugabyteDB or any other cloud provider for MySQL. Alternatively, [YugabyteDB](https://docs.yugabyte.com/preview/quick-start/) or MySQL can be installed locally.

Start the application

```
> cd api/ && node index.js
```

## Seed Database

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
