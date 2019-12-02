import { Fragment, useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import Router from 'next/router';
import { bindActionCreators } from 'redux';
import { Form, Input, Button, Col, Row, Checkbox, DatePicker, Upload, Icon, Radio, Select } from 'antd';
import * as AdminState from '../../store/AdminState';
import HeaderContent from '../HeaderContent';
import { CREATE_USER } from '../../constant/UrlApi';
import { DIALOG_SUCCESS, TOAST_ERROR, DIALOG_ERROR } from '../../utils/actions';
import { requestAPI, formItemLayout, spanCol } from '../../config';
import { formatDateServer } from '../../utils/dateUtils';

const { Option } = Select;
const connectToRedux = connect(pick(['listProvinces']), dispatch => ({
    adminActions: bindActionCreators(AdminState, dispatch),
    displayNotify: (type, message) => {
        dispatch({ type: type, payload: { message: message, options: {} } })
    },
    displayDialog: (type, title, content, onOK) => {
        dispatch({ type: type, payload: { title: title, content: content, onOK: onOK } })
    }
}))

function disabledDate(current) {
    var currentTime = current._d;
    return current && current < new Date(currentTime).setFullYear(new Date(currentTime).getFullYear() - 18);
}

const configRule = {
    name: [
        { required: true, message: "Please input name !" }
    ],
    username: [
        { required: true, message: "Please input username !" }
    ],
    password: [
        { required: true, message: 'Please input password !' },
        { min: 8, message: "Password's length must be at least 8 characters" }
    ],
    confirm: [
        { required: true, message: "Please input confirm password !" },
        { min: 8, message: "Password's length must be at least 8 characters" }
    ],
    birth: [
        { required: true, message: "Please input your birthday !" }
    ],
    email: [
        { required: true, message: "Please input your E-mail !" },
        { type: 'email', message: "The input is not valid E-mail !" }
    ],
    phone: [
        { required: true, message: "Please input your Phone-number !" },
        { pattern: /^0(1\d{9}|9\d{8})$/, message: "The input is not valid Phone-number !" }
    ],
    cmnd: [
        { required: true, message: "Please input Card ID !" }
    ],
    dateProvided: [
        { required: true, message: "Please input date Card ID provided !" }
    ],
    addressID: [
        { required: true, message: "Please input date Address Card ID provided !" }
    ]
}

class CreateUserComponent extends Component {
    constructor() {
        super()
    }

    componentWillMount() {
        let didCancel = false;
        if (!didCancel) {
            this.props.adminActions.getListProvincesAPI();
        }
        return didCancel = true;
    }
    createStudent = (e, displayDialog, displayNotify, form) => {
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.ngay_sinh = formatDateServer(values.ngay_sinh);
                values.ngay_cap = formatDateServer(values.ngay_cap);
                const opt = {
                    url: CREATE_USER,
                    method: 'POST',
                    data: values
                }
                if (values.password !== values.confirm) {
                    displayNotify(TOAST_ERROR, "Vui lòng nhập đúng confirm password")
                    return;
                }
                requestAPI(opt)
                    .then(({ data }) => {
                        if (data && data.status === 200) {
                            displayDialog(DIALOG_SUCCESS, data.message, '', () => Router.push('/user'))
                        } else {
                            displayNotify(TOAST_ERROR, data.errorMessage || 'Có lỗi xảy ra')
                        }
                    }).catch(({ response }) => {
                        response && displayNotify(TOAST_ERROR, 'Có lỗi xảy ra')
                    })
            }
        });
    }
    render() {
        const {
            form,
            displayNotify,
            displayDialog,
            listProvinces
        } = this.props;
        const { getFieldDecorator } = form;
        const { span, md, lg } = spanCol;
        return (
            <Fragment>
                <HeaderContent title="Create new user" />
                <div className="padding-table">
                    <Form  {...formItemLayout} onSubmit={() =>
                        this.createStudent(event, displayDialog, displayNotify, form)}>
                        <div className="card">
                            <div className="card-header-absolute">Account of employee :</div>
                            <Row>
                                <Col span={span} md={md} lg={lg}>
                                    <Form.Item label="Username">
                                        {getFieldDecorator('username', {
                                            rules: configRule.username
                                        })(<Input placeholder="Please input username" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={span} md={md} lg={lg}>
                                    <Form.Item label="Password">
                                        {getFieldDecorator('password', {
                                            rules: configRule.password
                                        })(<Input.Password placeholder="Please input password" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={span} md={md} lg={lg}>
                                    <Form.Item label="Confirm password">
                                        {getFieldDecorator('confirm', {
                                            rules: configRule.confirm
                                        })(<Input.Password placeholder="Please input confirm password"/>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                        <div className="card">
                            <div className="card-header-absolute">Information of employee :</div>
                            <Row>
                                <Col span={span} md={md} lg={lg}>
                                    <Form.Item label="Name of user">
                                        {getFieldDecorator('name', {
                                            rules: configRule.name
                                        })(<Input placeholder="Please input name of user"/>)}
                                    </Form.Item>
                                </Col>
                                <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                    <Form.Item label="Birthday" hasFeedback>
                                        {getFieldDecorator('ngay_sinh', {
                                            rules: configRule.birth
                                        })(
                                            <DatePicker format="DD/MM/YYYY" />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={span} md={md} lg={lg}>
                                    <Form.Item label="ID Card">
                                        {getFieldDecorator('cmnd', {
                                            rules: configRule.cmnd
                                        })(<Input placeholder="Please input ID Card of user"/>)}
                                    </Form.Item>
                                </Col>
                                <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                    <Form.Item label="Date ID provided">
                                        {getFieldDecorator('ngay_cap', {
                                            rules: configRule.dateProvided
                                        })(
                                            <DatePicker format="DD/MM/YYYY" />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={span} md={md} lg={lg}>
                                    <Form.Item label="Address ID provided">
                                        {getFieldDecorator('noi_cap', {
                                            rules: configRule.addressID
                                        })(
                                            <Select
                                                showSearch
                                                optionFilterProp="children"
                                                placeholder="Please select address Card ID provided">
                                                {
                                                    listProvinces.map(item => {
                                                        return <Option key={item.id} value={item.id}>
                                                            {item.id + '. ' + item.name}
                                                        </Option>
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={span} md={md} lg={lg}>
                                    <Form.Item label="Phone number">
                                        {getFieldDecorator('phone', {
                                            rules: configRule.phone
                                        })(
                                            <Input placeholder="Please input phone of user"/>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={span} md={md} lg={lg}>
                                    <Form.Item label="Email">
                                        {getFieldDecorator('email', {
                                            rules: configRule.email
                                        })(
                                            <Input placeholder="Please input email of user"/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={span} md={md} lg={lg}>
                                    <Form.Item label="Sex">
                                        {getFieldDecorator('gioi_tinh', {
                                            initialValue: 1
                                        })(
                                            <Radio.Group>
                                                <Radio value={2}>Fmale</Radio>
                                                <Radio value={1}>Male</Radio>
                                            </Radio.Group>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                        <Row type="flex" align="middle" justify="center">
                            <Form.Item>
                                <Button type="primary" htmlType="submit" >
                                    Create new user
                            </Button>
                            </Form.Item>
                        </Row>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

const WrappedCreateUser = Form.create()(CreateUserComponent)

export default connectToRedux(WrappedCreateUser);