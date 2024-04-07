import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Checkbox, Link, Message } from '@arco-design/web-react';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import { useLocalStorageState } from 'ahooks';
import Banner from './modules/Banner';
import useI18n from 'src/ahooks/useI18n';
import locales from './locales';
import styles from './index.module.less';
import './mock/user';
import CommonSetting from 'src/components/CommonSetting'
import { post } from 'src/utils/axios';

type IUserParams = {
  loginName: string;
  password: string;
};
const FormItem = Form.Item;

export const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { lang, i18n } = useI18n(locales);
  const navigate = useNavigate();
  const [userToken, setUserToken] = useLocalStorageState('userToken');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 判断是否登陆
    if (userToken) {
      navigate('/weclome');
    }
  }, []);

  const onSubmit = () => {
    form.validate((err, values) => {
      if (err) {
        return;
      }
      const { loginName, password } = values;
      login({ loginName, password });
    });
  };

  const login = (params: IUserParams) => {
    setLoading(true);
    post('/login/login', params)
      .then((res) => {
        const {
          code,
          msg,
          data,
        } = res.data;
        console.log(res);
        if (code == 200) {
          Message.success('登录成功');
          setUserToken(data);
          navigate('/weclome');
        } else {
          Message.error(msg);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.login}>
      {/*<div className={styles.logo}>
        <h1 style={{ margin: 0, marginLeft: '10px' }}>YSH</h1>
      </div>
      <div className={styles.left}>
        <Banner />
      </div>*/}
      <div className={styles.right}>
        <div>
          <div className={styles.title}>登录</div>
          <Form
            form={form}
            style={{ width: 320 }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              loginName: 'admin',
              password: 'admin',
            }}
            onSubmit={onSubmit}
          >
            <FormItem
              field="loginName"
              rules={[{ required: true, message: `${i18n[lang]['login.loginName.isNotEmpty']}` }]}
            >
              <Input prefix={<IconUser />} type="text" placeholder="admin" />
            </FormItem>
            <FormItem
              field="password"
              rules={[{ required: true, message: `${i18n[lang]['login.password.isNotEmpty']}` }]}
            >
              <Input.Password prefix={<IconLock />} placeholder="admin" visibilityToggle />
            </FormItem>
            <FormItem>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Checkbox>{i18n[lang]['login.rememberPassword']}</Checkbox>
                <Link>{i18n[lang]['login.forgetPassword']}</Link>
              </div>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" long loading={loading}>
                {i18n[lang]['login.login']}
              </Button>
            </FormItem>
            <FormItem>
              <Button type="text" long>
                {i18n[lang]['login.registerAccount']}
              </Button>
            </FormItem>
          </Form>
        </div>
        <div className={styles.footer}>1</div>
      </div>
      <CommonSetting />
    </div>
  );
};
