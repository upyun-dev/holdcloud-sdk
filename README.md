## holdcloud sdk package

### Install using npm:
```
npm i holdcloud-sdk --save
```

### import and constructor
```javascript
const HoldCloud = require('holdcloud-sdk');
const holdcloud = new HoldCloud(username, password, baseUrl);
```

### methods

**Gets a list of services under the specified project**

```javascript
/**
 * @param   {String}  projectId    project id
 * @return  {array}         			 list
 */
holdcloud.listStatelessService(projectId);
```

**Create the container service under the specified project**

```javascript
/**
 * @param   {String}}  project  	project id
 * @param   {Object}   options  	app param
 * @return  {integer}         		app id
 */
holdcloud.createStatelesscontainerApps(projectId, options);
```

**Creating a container instance**

```javascript
/**
 * @param   {integer}  	appId    app id
 * @param   {Object}  	options  instance param
 * @return  {Object}           	 {}
 */
holdcloud.createStatelessService(appId);
```

**Restart the specified service**

```javascript
/**
 * @param  {integer} appId  [app id]
 */
holdcloud.restartStatelessService(appId);
```

**Delete container specified service**

```javascript
/**
 * @param  {integer} appId  [app id]
 */
holdcloud.destroyStatelessService(appId);
```

### Tests
`/test/holdcloud.test.js`,

**constructor**

```javascript
const username = '**@gmail.com';
const password = '*****';
const baseUrl = 'https://console.holdcloud.com/api/v1';
const projectId = 89;
const appId = 133;
```

**run**

```
npm run test
```

