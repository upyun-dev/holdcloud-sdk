'use strict';

const crypto = require('crypto');
const got = require('got');
class HoldCloud {
  /**
   * [constructor description]
   *
   * @param   {[String]}    username      [用户名]
   * @param   {[String]}    password      [用户密码]
   * @param   {[String]}    baseUrl       [基础 url]
   * @param   {[Boolean]}   noStrictSSL   是否校验证书
   *
   */
  constructor(username, password, baseUrl, noStrictSSL) {
    this.username = username;
    this.password = password;
    this.BASE_URI = baseUrl;
    this.noStrictSSL = noStrictSSL;

    this.rp = got.extend({
      prefixUrl: baseUrl,
      responseType: 'json',
      resolveBodyOnly: true,
      https: {
        rejectUnauthorized: !noStrictSSL,
      },
      hooks: {
        afterResponse: [
          async (response, retryWithMergedOptions) => {
            if (response.statusCode === 401) {
              const updatedOptions = {
                headers: {
                  jweToken: await this.updateToken(), // Refresh the access token
                },
              };

              this.rp.defaults.options = got.mergeOptions(this.rp.defaults.options, updatedOptions);
              return retryWithMergedOptions(updatedOptions);
            }
            return response;
          },
        ],
      },
      mutableDefaults: true,
    });
  }
}

HoldCloud.prototype.updateToken = async function () {
  const result = await got({
    method: 'POST',
    url: `${this.BASE_URI}/login`,
    json: {
      username: this.username,
      password: crypto.createHash('md5').update(this.password, 'utf8').digest('hex'),
    },
    responseType: 'json',
    resolveBodyOnly: true,
    https: {
      rejectUnauthorized: !this.noStrictSSL,
    },
  });
  return result.jweToken;
};

/**
 * 获取指定项目下的服务列表
 *
 * @param   {String}  projectId    服务id
 *
 * @return  {array}         列表
 */
HoldCloud.prototype.listUnionservices = async function (projectId) {
  return this.rp({
    method: 'GET',
    url: `project/${projectId}/unionservices`,
  });
};

/**
 * 在指定项目下创建容器服务
 *
 * @param   {String}}  projectId  项目 id
 * @param   {Object}  options  服务参数
 *
 * @return  {integer}         服务id
 */
HoldCloud.prototype.createContainerApp = async function (projectId, options) {
  return await this.rp({
    method: 'POST',
    url: `project/${projectId}/containerapps`,
    json: options,
  });
};

/**
 * 检查服务名称是否重复
 *
 * @param   {string}  projectId  项目 Id
 * @param   {string}  name       服务名称
 *
 * @return  {object}             {code: 400, id: data[0].id};
 */
HoldCloud.prototype.checkContainerappsName = async function (projectId, name) {
  const data = await this.rp({
    method: 'GET',
    url: `project/${projectId}/unionservices?itemsPerPage=10&page=1&filterBy=name,^${name}$,&sortBy=a,name`,
  });
  if (data.totalItems !== 0 && data.items[0].name === name) {
    return {code: 400, id: data.items[0].id};
  }
  return {code: 200, id: null};
};

/**
 * 创建容器实例
 *
 * @param   {integer}  appId    服务 id
 * @param   {Object}  options  实例参数
 *
 * @return  {Object}           {}
 */
HoldCloud.prototype.createContainerAppInstances = async function (appId, options) {
  return await this.rp({
    method: 'POST',
    url: `containerapp/${appId}/instances`,
    json: options,
  });
};

/**
 * 获取容器实例状态
 *
 * @param   {integer}  appId    服务 id
 *
 * @return  {Object}           {state: "Creating"}
 */
HoldCloud.prototype.getContainerAppState = async function (appId) {
  return await this.rp({
    method: 'GET',
    url: `containerapp/${appId}/state`,
  });
};

/**
 * 删除容器服务
 *
 * @param   {Integer}  appId  [app 编号]
 *
 * @return  {[Object]}       [{}]
 */
HoldCloud.prototype.destroyContainerApp = async function (appId) {
  return await this.rp({
    method: 'DELETE',
    url: `containerapp/${appId}`,
  });
};

/**
 * 重新启动指定服务
 * @param  {integer} appId  [app 编号]
 */
HoldCloud.prototype.restartContainerApp = async function (appId) {
  return await this.rp({
    method: 'POST',
    url: `containerapp/${appId}/restart`,
  });
};

module.exports = HoldCloud;
