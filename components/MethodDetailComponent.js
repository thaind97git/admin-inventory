import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Form, Input, Button, Col, Row, Checkbox, DatePicker, Upload, Icon, Radio, Avatar, Select } from 'antd';
import { pick } from 'lodash/fp';
import { bindActionCreators } from 'redux';
import * as AdminState from '../store/AdminState';
import HeaderContent from './HeaderContent';
import { requestAPI, formItemLayout, spanCol } from '../config';
import { GET_USER, UPDATE_USER, GET_PROVINCES } from '../constant/UrlApi';
import MissinginforComponent from './MissinginforComponent';
import AvatarComponent from './AvatarComponent';
import { DIALOG_SUCCESS, TOAST_ERROR, DIALOG_ERROR } from '../utils/actions';
import { momentDateUser, formatDateServer, momentDatePicker, momentTimeSpanPicker } from '../utils/dateUtils';
import { GET_ONE_METHOD_REGISTER, UPDATE_METHOD_REGISTER } from '../constant/UrlApi';

const { Option } = Select;
const connectToRedux = connect(
    pick(['listProvinces']),
    dispatch => ({
        adminActions: bindActionCreators(AdminState, dispatch),
        displayNotify: (type, message) => {
            dispatch({ type: type, payload: { message: message, options: {} } })
        },
        displayDialog: (type, title, content, onOK) => {
            dispatch({ type: type, payload: { title: title, content: content, onOK } })
        },
    })
)

const configRule = {
    name: [
        { required: true, message: "Please input name !" }
    ],
    methodType: [
        { required: true, message: "Please input method type !" }
    ],
    id: [
        { required: true, message: "Please input id !" },
    ]
}

class MethodDetailComponent extends Component {
    constructor() {
        super();
        this.state = {
            method: {},
            id: Router.query.id
        }
    }
    componentWillMount() {
        const opt = { method: 'GET', url: `${GET_ONE_METHOD_REGISTER}/${this.state.id}` }
        const getMethodDEtail = async () => {
            try {
                const rs = await requestAPI(opt);
                this.setState({ method: rs.data.data })
            } catch (error) {
                console.log(error)
            }
        }
        getMethodDEtail();
    }
    updateMethod = (e) => {
        e.preventDefault();
        const { displayDialog, form, displayNotify } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const opt = {
                    url: `${UPDATE_METHOD_REGISTER}/${this.state.id}`,
                    method: 'PUT',
                    data: {
                        "name": values.name,
                        "id_register_method_type": values.id_register_method_type
                    }
                }
                requestAPI(opt)
                    .then(({ data }) => {
                        if (data && data.status === 200) {
                            displayDialog(DIALOG_SUCCESS, data.message, '', () => Router.push('/register-method'))
                        } else {
                            console.log(data)
                            displayDialog(DIALOG_ERROR, data.errorMessage)
                        }
                    }).catch(({ response }) => {
                        response && displayNotify(TOAST_ERROR, 'Có lỗi xảy ra')
                    })
            }
        });
    }
    render() {
        const { method = null } = this.state;
        const { span, md, lg } = spanCol;
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            !method ? <MissinginforComponent>Not Found</MissinginforComponent>
                : <Fragment>
                    <HeaderContent title="Update Method Register" />
                    <div className="padding-table">
                        <Form  {...formItemLayout} onSubmit={this.updateMethod}>
                            <div className="card">
                                <div className="card-header-absolute">Information of register method :</div>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Method Name">
                                            {getFieldDecorator('name', {
                                                initialValue: method.name,
                                                rules: configRule.name
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="ID">
                                            {getFieldDecorator('id', {
                                                initialValue: method.id,
                                                rules: configRule.id
                                            })(<Input disabled />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                        <Form.Item label="Method Type">
                                            {getFieldDecorator('id_register_method_type', {
                                                initialValue: method.id_register_method_type,
                                                rules: configRule.methodType
                                            })(
                                                <Input disabled />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Date created">
                                            {getFieldDecorator('created', {
                                                initialValue: momentDateUser(method.created)
                                            })(
                                                <Input disabled />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                            <Row type="flex" align="middle" justify="center">
                                <Form.Item>
                                    <Button type="primary" shape="round" htmlType="submit" >
                                        Update Register Method
                                    </Button>
                                </Form.Item>
                            </Row>
                        </Form>
                    </div>
                </Fragment>
        )
    }
}

const WrappedMethodDetail = Form.create()(MethodDetailComponent)

export default connectToRedux(WrappedMethodDetail);