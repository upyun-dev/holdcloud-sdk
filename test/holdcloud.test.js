const expect = require('chai').expect;
const _ = require('lodash');
const HoldCloud = require('../index');
const username = 'bo.yang@upai.com';
const password = 'bo.yang@upai';
const baseUrl = 'https://console.holdcloud.com/api/v1';
const projectId = 89;
const appId = 149;

describe('holdcloud test', () => {
  describe('post', () => {
    it('获取 token', async function () {
      const holdcloud = new HoldCloud(username, password, baseUrl);
      const res = await holdcloud.updateToken();
      expect(res).to.be.a('string');
    });
  });

  describe('get', () => {
    it('获取指定项目下的服务列表', async function () {
      const holdcloud = new HoldCloud(username, password, baseUrl);
      const res = await holdcloud.listUnionservices(projectId);
      expect(res).to.be.a('object');
      expect(res.items[0].id).to.be.a('number');
      expect(res.items[0].kind).to.be.a('string');
      expect(res.items[0].description).to.be.a('string');
      expect(res.items[0].replicas).to.be.a('number');
      expect(res.items[0].cpu).to.be.a('number');
      expect(res.items[0].memory).to.be.a('number');
    });
  });

  describe('post', () => {
    it('在指定项目下创建容器服务', async function () {
      const holdcloud = new HoldCloud(username, password, baseUrl);
      const options = {
        description: "string",
        kind: "Deployment",
        name: `test-${_.random(0, 100)}`,
      }
      const res = await holdcloud.createContainerApp(projectId, options);
      expect(res.id).to.be.a('number');
    });
  });

  describe('post', () => {
    it('创建容器实例实例', async function () {
      const holdcloud = new HoldCloud(username, password, baseUrl);
      const options = {
        container: {
          command: `'-c',command`,
          cpuLimit: 0.1,
          cpuRequest: 0.1,
          envFromConfig: [],
          envs: {},
          image: "ffmpeg:0.1.3",
          imagePullPolicyAlways: true,
          memoryLimit: 1073741824,
          memoryRequest: 1073741824,
          ports: [],
          registryType: "Group",
        },
        healthCheck: {},
        minReadySeconds: 5,
        replicas: 1,
        volumes: [],
      }
      const res = await holdcloud.createInstances(appId, options);
      expect(res).to.eql({});
    });
  });
  describe('post', () => {
    it('重新启动指定服务', async function () {
      const holdcloud = new HoldCloud(username, password, baseUrl);
      const res = await holdcloud.restartContainerApp(appId);
      expect(res).to.be.a('string');
    });
  })

  describe('delete', () => {
    it('删除容器服务', async function () {
      const holdcloud = new HoldCloud(username, password, baseUrl);
      const res = await holdcloud.destroyContainerApp(appId);
      expect(res).to.be.a('string');
    });
  });
})



