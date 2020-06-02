## holdcloud sdk package

### Install

### import and constructor

```javascript
const HoldCloud = require('holdcloud-sdk');
const holdcloud = new HoldCloud(username, password, baseUrl);
```

### methods

#### Gets a list of services under the specified project

```javascript
/**
 * @param   {String}  projectId    project id
 * @return  {array}             list
 */
holdcloud.listUnionservices(projectId);
```

#### Create the container service under the specified project

```javascript
/**
 * @param   {String}}  project   project id
 * @param   {Object}   options   app param
 * @return  {integer}           app id
 */
holdcloud.createContainerApp(projectId, options);
```

#### Creating a container instance

```javascript
/**
 * @param   {integer}   appId    app id
 * @param   {Object}   options  instance param
 * @return  {Object}             {}
 */
holdcloud.createContainerAppInstances(appId);
```

#### Check to see if the container app name is repeated

```javascript
/**
 * @param   {string}  projectId  project Id
 * @param   {string}  name       container name
 * @return  {object}             {code: 400, id: 233} || {code: 200, id: null}
 */
holdcloud.checkContainerappsName(projectId, name);
```

#### get container instance status

```javascript
/**
 * @param   {integer}  appId    服务 id
 * @return  {Object}           {state: "Creating"}
 */
holdcloud.getContainerAppState(appId);
```

#### Restart the specified service

```javascript
/**
 * @param  {integer} appId  [app id]
 */
holdcloud.restartContainerApp(appId);
```

#### Delete container specified service

```javascript
/**
 * @param  {integer} appId  [app id]
 */
holdcloud.destroyContainerApp(appId);
```

### Tests

`/test/holdcloud.test.js`,

#### constructor

```javascript
const username = '**@gmail.com';
const password = '*****';
const baseUrl = 'https://console.holdcloud.com/api/v1';
const projectId = 89;
const appId = 133;
```

#### run

```bash
npm run test
```
