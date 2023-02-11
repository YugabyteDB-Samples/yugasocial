# Local Docker Deployment

Follow this instruction if you wish to run the entire application with all the components on your local machine using Docker and Docker-Compose.

<!-- vscode-markdown-toc -->

- [Local Docker Deployment](#local-application-deployment)
  - [Prerequisites](#prerequisites)
  - [Architecture](#architecture)
  - [Run Application Services](#run-application-services)
    - [Running on YugabyteDB Managed](#running-on-yugabytedb-managed)
    - [Running on YugabyteDB within Docker](#running-on-yugabytedb-within-docker)
    - [Running on MySQL in the Cloud](#running-on-mysql-in-the-cloud)
    - [Running on MySQL within Docker](#running-on-mysql-within-docker)
  - [Seed Database](#seed-database)

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

#### **Running on YugabyteDB Managed**

Refer to `docker-compose-yugabyte.yaml` and alter the connection details to match that of your YugabyteDB Managed Cluster.

In your terminal, run

```
docker compose -f docker-compose-yugabyte.yaml up
```

to build and run your api services and when everything is up and running visit the app at
[localhost:3000](http://localhost:3000).

#### **Running on YugabyteDB within Docker**

This is a self-contained deployment, which doesn't require any additional configuration.

In your terminal, run

```
docker compose -f docker-compose-yugabyte-local.yaml up
```

to build and run your api services and when everything is up and running visit the app at
[localhost:3000](http://localhost:3000).

You can also view the YugabyteDB UI Console at [localhost:7001](http://localhost:7001).

<img width="1584" alt="Screen Shot 2022-11-02 at 7 36 17 PM" src="https://user-images.githubusercontent.com/2041330/199637751-616d19ff-e474-4d17-956c-fe672c53052c.png">

#### **Running on MySQL in the Cloud**

Refer to `docker-compose-mysql.yaml` and alter the connection details to match that of your remote MySQL database.

In your terminal, run

```
docker compose -f docker-compose-mysql.yaml up
```

to build and run your api services and when everything is up and running visit the app at
[localhost:3000](http://localhost:3000).

#### **Running on MySQL within Docker**

This is a self-contained deployment, which doesn't require any additional configuration.

In your terminal, run

```
docker compose -f docker-compose-mysql-local.yaml up
```

to build and run your api services and when everything is up and running visit the app at
[localhost:3000](http://localhost:3000).
