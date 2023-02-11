# Local Manual Deployment

Follow this instruction if you wish to run the application components locally without Docker.

<!-- vscode-markdown-toc -->

- [Local Application Deployment](#local-application-deployment)
  - [Prerequisites](#prerequisites)
  - [Architecture](#architecture)
  - [Configure Your Environment](#configure-your-environment)
  - [Run Application Services](#run-application-services)
  - [Seed Database](#seed-database)

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

YugaSocial uses the [Dotenv](https://www.npmjs.com/package/dotenv) package configure it's applicaiton environment. Refer to `/api/.env`, updating the configuration to match your deployment.

## Run Application Services

This application runs locally via a Node.js server.

Users have the option to connect these services to YugabyteDB or MySQL.

These database deployments can be hosted in the cloud, with [YugabyteDB Managed](https://www.yugabyte.com/managed/) for YugabyteDB or any other cloud provider for MySQL. Alternatively, [YugabyteDB](https://docs.yugabyte.com/preview/quick-start/) or MySQL can be installed locally.

In your terminal, run

```
> cd client/
> npm install
> npm run build
> cd ../api
> npm install
> node index.js
```

to build and run your api services and when everything is up and running visit the app at
[localhost:8800](http://localhost:8800).

If running YugabyteDB locally, you can also view the YugabyteDB UI Console at [localhost:7001](http://localhost:7001).

<img width="1584" alt="Screen Shot 2022-11-02 at 7 36 17 PM" src="https://user-images.githubusercontent.com/2041330/199637751-616d19ff-e474-4d17-956c-fe672c53052c.png">
