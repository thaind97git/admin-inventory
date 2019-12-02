import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Form, Input, Button, Col, Row, Checkbox, DatePicker, Upload, Icon, Radio, Avatar, Select } from 'antd';
import { pick } from 'lodash/fp';
import { bindActionCreators } from 'redux';
import * as AdminState from '../../store/AdminState';
import HeaderContent from '../HeaderContent';
import { requestAPI, formItemLayout, spanCol } from '../../config';
import { GET_USER, UPDATE_USER, GET_PROVINCES } from '../../constant/UrlApi';
import MissinginforComponent from '../MissinginforComponent';
import AvatarComponent from '../AvatarComponent';
import { DIALOG_SUCCESS, TOAST_ERROR, DIALOG_ERROR } from '../../utils/actions';
import { momentDateUser, formatDateServer, momentDatePicker, momentTimeSpanPicker } from '../../utils/dateUtils';

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
    birth: [
        { required: true, message: "Please input birthday !" }
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
    ],
    sex: [
        { required: true, message: "Please input user's sex !" }
    ]
}

const normFile = e => {
    console.log(e)
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

class StudentDetailComponent extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            id: Router.query.id
        }
    }
    componentWillMount() {
        const opt = { method: 'GET', url: `${GET_USER}/${this.state.id}` }
        const getStudent = async () => {
            try {
                const rs = await requestAPI(opt);
                this.setState({ user: rs.data.data })
            } catch (error) {
                console.log(error)
            }
        }
        this.props.adminActions.getListProvincesAPI();
        getStudent();
    }
    updateUser = (e) => {
        e.preventDefault();
        const { displayDialog, form, displayNotify } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.ngay_sinh = formatDateServer(values.ngay_sinh);
                values.ngay_cap = formatDateServer(values.ngay_cap);
                const opt = {
                    url: `${UPDATE_USER}/${this.state.id}`,
                    method: 'PUT',
                    data: values
                }
                requestAPI(opt)
                    .then(({ data }) => {
                        if (data && data.status === 200) {
                            displayDialog(DIALOG_SUCCESS, data.message, '', () => Router.push('/user'))
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
        const { user = null } = this.state;
        const { span, md, lg } = spanCol;
        const { listProvinces, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            !user ? <MissinginforComponent>Not Found</MissinginforComponent>
                : <Fragment>
                    <HeaderContent title="Update User" />
                    <div className="padding-table">
                        <Form  {...formItemLayout} onSubmit={this.updateUser}>
                            <div className="card">
                                <div className="card-header-absolute">Information of user :</div>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Student's Name">
                                            {getFieldDecorator('name', {
                                                initialValue: user.name,
                                                rules: configRule.name
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                        <Form.Item label="Birthday">
                                            {getFieldDecorator('ngay_sinh', {
                                                initialValue: momentTimeSpanPicker(user.ngay_sinh),
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
                                                initialValue: user.cmnd,
                                                rules: configRule.cmnd
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                        <Form.Item label="Date ID provided">
                                            {getFieldDecorator('ngay_cap', {
                                                initialValue: momentDatePicker(user.ngay_cap),
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
                                                initialValue: +user.noi_cap,
                                                rules: configRule.addressID,
                                            })(
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    placeholder="Please select address Card ID provided">
                                                    {
                                                        listProvinces.map(item => {
                                                            return <Option key={item.id} value={item.id}>
                                                                {item.name}
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
                                                initialValue: user.phone,
                                                rules: configRule.phone
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Email">
                                            {getFieldDecorator('email', {
                                                initialValue: user.email,
                                                rules: configRule.email
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Date created">
                                            {getFieldDecorator('created', {
                                                initialValue: momentDateUser(user.created)
                                            })(
                                                <Input disabled />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Sex">
                                            {getFieldDecorator('gioi_tinh', {
                                                initialValue: user.gioi_tinh,
                                                rules: configRule.sex
                                            })(
                                                <Radio.Group>
                                                    <Radio value={2}>Fmale</Radio>
                                                    <Radio value={1}>Male</Radio>
                                                </Radio.Group>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Avatar">
                                            {getFieldDecorator('avatar', {
                                                valuePropName: 'fileList',
                                                getValueFromEvent: normFile,
                                            })(
                                                // <Fragment>
                                                <AvatarComponent src={user.avatar} medium />
                                                // <Upload multiple={false} name="logo" listType="picture">
                                                //     <Button>
                                                //         <Icon type="upload" /> Click to upload
                                                //     </Button>
                                                // </Upload>
                                                // </Fragment>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                            <Row type="flex" align="middle" justify="center">
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" >
                                        Update Student
                                    </Button>
                                </Form.Item>
                            </Row>
                        </Form>
                    </div>
                </Fragment>
        )
    }
}

const WrappedStudentDetail = Form.create()(StudentDetailComponent)

export default connectToRedux(WrappedStudentDetail);