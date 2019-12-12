import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { TOAST_ERROR } from '../utils/actions';
import { Z_INDEX_LOGIN } from '../constant/constants';
import { doPost } from '../config/index';
import * as Utils from '../utils/utils';
import { setToken, setUsername } from '../config/storageConfig';

const styleForm = {
  backgroundColor: '#f5f5f5',
  padding: '20px 50px',
  boxShadow: '0 6px 8px rgba(102,119,136,.03), 0 1px 2px rgba(102,119,136,.3), 0 8px 12px rgba(58,193,203,.1)',
  borderRadius: 2
}

const connectToRedux = connect(null, dispatch => ({
  displayNotify: (type, message) => {
    dispatch({ type: type, payload: { message: message, options: {} } })
  }
}));


const LoginComponent = ({ form, displayNotify }) => {
  const { getFieldDecorator } = form;
  const [loadingButton, setLoadingButton] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        setLoadingButton(true)
        try {
          const rs = await doPost({
            path: "/token",
            body: `grant_type=password&username=${values.username}&password=${values.password}`
          })
          setLoadingButton(false);
          if (rs && rs.data) {
            let { access_token, userName = "Not yet" } = rs.data;
            setToken(access_token)
            userName = userName.length > 10 ? `${userName.slice(0, 10)}...` : userName
            setUsername(userName);
            Utils.redirectURL("/dashboard");
            return;
          }
        } catch (error) {
          setLoadingButton(false);
          displayNotify(TOAST_ERROR, 'Username or password wrong !')
        }
      }
    });
  };
  return (
    <Row type="flex" align="middle" justify="center"
      style={{
        height: '100vh',
        background: 'url(/static/image/a.jpg) no-repeat',
        backgroundSize: 'cover',
        zIndex: Z_INDEX_LOGIN,
      }}
    >
      <Col xs={20} sm={12} md={12} lg={8} style={styleForm}>
        <h1 className="align-center"> Inventory Management</h1>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Row type="flex" align="middle" justify="center">
              <Button loading={loadingButton} type="primary" htmlType="submit" className="login-form-button">
                Login
                            </Button>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

const WrappedLogin = Form.create()(LoginComponent)
export default connectToRedux(WrappedLogin);