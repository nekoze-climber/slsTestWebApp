# slsTestWEbApp222

## Description

slsTestApp is a sample serverless application. slsTestApp has no GUI.
This application is supposed to be deployed to AWS by serverless framework.

## Features

slslTestApp can CREATE/GET/UPDATE/DELETE Person model data.

- GET dev/slsTestApp/v1/api/person/{personId}
  - Get single Person model match with personId
- POST dev/slsTestApp/v1/api/person
  - Create new single Person model
- PUT dev/slsTestApp/v1/api/person/{personId}
  - Uodate single Person model match with personId
- DELETE dev/slsTestApp/v1/api/person/{personId}

  - Delete single Person model match with personId

  ### Person Model

  Person Model which slsTestApp can accept is below.

  ```
  {
    "age": "28",
    "height": "178",
    "name": "tarou",
    "weight": "70"
  }
  ```

  Person Model which generated by slsTestApp is below.

  ```
  {
    "personId": "uuid"
    "age": "28",
    "height": "178",
    "name": "tarou",
    "weight": "70"
  }
  ```

## Installation

1. Please clone this repository
2. Install [Nodejs](https://nodejs.org/)
3. Please create AWS Account and IAM user.
4. Install [AWS CLIv2](https://aws.amazon.com/cli/)
5. Execute npm command below at root directory.
   - `npm install`
6. To install [serverless framework](https://www.serverless.com/), execute
   - `npm install -g serverless`

## Deploy

1. Replace `{Please replace with your IAM Account ID here.}` to your IAM account id
2. Replace `{Please replace with your IP here.}` to your IP address which is allowed to access.
3. Add line comment to below at root `serverlss.yml`

   `- \${file(./service/templates/api-gateway.yml)}`

4. Deploy Lambda Functions and IAM Role. Execute command below at root directory
   - `sls deploy -v`
5. Remove line comment to below at root `serverlss.yml`

   `- \${file(./service/templates/api-gateway.yml)}`

6. Deploy API Gateway. Execute command below at root directory
   - `sls deploy -v`
7. Deploy WAF IPset. Execute command below at `/waf/ipset`
   - `sls deploy -v`
8. Deploy WAF WebACL. Execute command below at `/waf/webACL`
   - `sls deploy -v`
9. Deploy WAF association. Execute command below at `/waf/association`
   - `sls deploy -v`

## Usage

- Use HTTPS client tool(ex. curl) and execute slsTestApp APIs.

## Undeploy

1. Undeploy WAF association. Execute command below at `/waf/association`
   - `sls remove`
2. Undeploy WAF WebACL. Execute command below at `/waf/webACL`
   - `sls remove`
3. Undeploy WAF IPset. Execute command below at `/waf/ipset`
   - `sls remove`
4. Undeploy Lambda Functions, IAM Role and API Gateway. Execute command below at root
   - `sls remove`

## Unit Testing

1. Execute jest at root
   - `npm test`
2. If you want update unit test, show `___test___` directory