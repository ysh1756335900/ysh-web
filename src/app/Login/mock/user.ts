import Mock from 'mockjs';
import { uuid } from 'src/utils'
import setupMock from 'src/utils/setupMock';

setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/user/login'), (params: { body: string }) => {
      const { loginName, password } = JSON.parse(params.body);
      if (!loginName) {
        return {
          status: 'error',
          msg: '用户名不能为空',
        };
      }
      if (!password) {
        return {
          status: 'error',
          msg: '密码不能为空',
        };
      }
      if (loginName === 'admin' && password === 'admin') {
        return {
          status: 'ok',
          data: {
            token: uuid(),
          },
        };
      }
      return {
        status: 'error',
        msg: '账号或者密码错误',
      };
    });
  },
});
