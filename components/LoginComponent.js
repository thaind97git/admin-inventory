import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { LOGIN } from '../constant/UrlApi';
import { TOAST_ERROR, TOAST_WARN } from '../utils/actions';
import { Z_INDEX_LOGIN } from '../constant/constants';
import { requestAPI } from '../config/index';
import * as storageConfig from '../config/storageConfig';
import * as Utils from '../utils/utils';

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
        form.validateFields((err, values) => {
            if (!err) {
                setLoadingButton(true)
                const opt = {
                    url: LOGIN,
                    method: "POST",
                    data: { username: values.username, password: values.password },
                }
                requestAPI(opt)
                    .then(({ data }) => {
                        setLoadingButton(false)
                        if (data && data.status === 200 && !Utils.isEmptyObject(data.data)) {
                            storageConfig.setUsername(data.data.username);
                            Utils.redirectURL("/dashboard");
                            return;
                        }
                        displayNotify(TOAST_ERROR, data.errorMessage || 'Tài khoản hoặc mật khẩu không đúng')
                    }).catch(({ response }) => {
                        setLoadingButton(false);
                        if (response !== undefined) {
                            displayNotify(TOAST_ERROR, response.data.errorMessage || 'Tài khoản hoặc mật khẩu không đúng')
                        } else {
                            displayNotify(TOAST_WARN, 'Có lỗi không xác định')
                        }
                    })
            }
        });
    };
    return (
        <Row type="flex" align="middle" justify="center"
            style={{
                height: '100vh',
                background: 'url(/static/image/bg2.jpeg) no-repeat',
                backgroundSize: 'cover',
                zIndex: Z_INDEX_LOGIN,
            }}
        >
            <Col xs={20} sm={12} md={12} lg={8} style={styleForm}>
                <h1 className="align-center"> Admin site FPTU New K</h1>
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