import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Form, Input, Button, Col, Row, DatePicker, TimePicker, Select } from 'antd';
import { pick } from 'lodash/fp';
import { bindActionCreators } from 'redux';
import * as AdminState from '../../store/AdminState';
import HeaderContent from '../HeaderContent';
import { requestAPI, formItemLayout, spanCol } from '../../config';
import { GET_USER, UPDATE_USER, GET_PROVINCES, UPDATE_EXAM, GET_EXAM } from '../../constant/UrlApi';
import MissinginforComponent from '../MissinginforComponent';
import { DIALOG_SUCCESS, TOAST_ERROR, DIALOG_ERROR } from '../../utils/actions';
import { 
    momentDateUser, 
    formatDateServer, 
    momentDatePicker, 
    momentTimePickerUser,
    formatTimeServer
} from '../../utils/dateUtils';
import { GET_ONE_METHOD_REGISTER, UPDATE_METHOD_REGISTER } from '../../constant/UrlApi';

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
    type: [
        { required: true, message: "Please input exam type !" }
    ],
    name: [
        { required: true, message: "Please input exam name !" }
    ],
    date: [
        { required: true, message: "Please input exam date !" }
    ],
    time: [
        { required: true, message: "Please input exam time !" }
    ],
    start: [
        { required: true, message: 'Please input date start !' },
    ],
    end: [
        { required: true, message: 'Please input date end !' },
    ]
}

class ExamDetailComponent extends Component {
    constructor() {
        super();
        this.state = {
            exam: {},
            id: Router.query.id
        }
    }
    componentWillMount() {
        const opt = { method: 'GET', url: `${GET_EXAM}/${this.state.id}` }
        const getMethodDEtail = async () => {
            try {
                const rs = await requestAPI(opt);
                this.setState({ exam: rs.data.data })
            } catch (error) {
                console.log(error)
            }
        }
        getMethodDEtail();
    }
    updateExam = (e) => {
        e.preventDefault();
        const { displayDialog, form, displayNotify } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.ngay_thi = formatDateServer(values.ngay_thi);
                values.ngay_bat_dau = formatDateServer(values.ngay_bat_dau);
                values.ngay_ket_thuc = formatDateServer(values.ngay_ket_thuc);
                values.gio_thi = formatTimeServer(values.gio_thi);
                const opt = {
                    url: `${UPDATE_EXAM}/${this.state.id}`,
                    method: 'PUT',
                    data: values
                }
                requestAPI(opt)
                    .then(({ data }) => {
                        if (data && data.status === 200) {
                            displayDialog(DIALOG_SUCCESS, data.message, '', () => Router.push('/exam'))
                        } else {
                            console.log(data)
                            displayDialog(DIALOG_ERROR, data.errorMessage)
                        }
                    }).catch(({ response }) => {
                        response ? displayNotify(TOAST_ERROR, response.errorMessage || 'Có lỗi xảy ra')
                        : displayNotify(TOAST_ERROR, 'Có lỗi xảy ra')
                    })
            }
        });
    }
    render() {
        const { exam = null } = this.state;
        const { span, md, lg } = spanCol;
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            !exam ? <MissinginforComponent>Not Found</MissinginforComponent>
                : <Fragment>
                    <HeaderContent title="Update Exam" />
                    <div className="padding-table">
                        <Form  {...formItemLayout} onSubmit={this.updateExam}>
                            <div className="card">
                                <div className="card-header-absolute">Information of exam :</div>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Exam name">
                                            {getFieldDecorator('name', {
                                                initialValue: exam.name,
                                                rules: configRule.name
                                            })(<Input placeholder="Please input name of exam" />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Exam type">
                                            {getFieldDecorator('loai_ky_thi', {
                                                initialValue: exam.loai_ky_thi,
                                                rules: configRule.type
                                            })(<Input disabled />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item style={{ textAlign: 'left' }} label="Date exam">
                                            {getFieldDecorator('ngay_thi', {
                                                initialValue: momentDatePicker(exam.ngay_thi),
                                                rules: configRule.date
                                            })(
                                                <DatePicker format="DD/MM/YYYY" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item style={{ textAlign: 'left' }} label="Exam time" >
                                            {getFieldDecorator('gio_thi', {
                                                initialValue: momentTimePickerUser(exam.gio_thi),
                                                rules: configRule.time
                                            })(
                                                <TimePicker use12Hours format="h:mm a" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item style={{ textAlign: 'left' }} label="Date start">
                                            {getFieldDecorator('ngay_bat_dau', {
                                                initialValue: momentDatePicker(exam.ngay_bat_dau),
                                                rules: configRule.start
                                            })(
                                                <DatePicker format="DD/MM/YYYY" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item style={{ textAlign: 'left' }} label="Date end" >
                                            {getFieldDecorator('ngay_ket_thuc', {
                                                initialValue: momentDatePicker(exam.ngay_ket_thuc),
                                                rules: configRule.end
                                            })(<DatePicker format="DD/MM/YYYY" />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Description">
                                            {getFieldDecorator('ghi_chu', {
                                                initialValue: exam.ghi_chu,
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Date created">
                                            {getFieldDecorator('created', {
                                                initialValue: momentDateUser(exam.created)
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
                                        Update Exam
                                    </Button>
                                </Form.Item>
                            </Row>
                        </Form>
                    </div>
                </Fragment>
        )
    }
}

const WrappedExamDetail = Form.create()(ExamDetailComponent)

export default connectToRedux(WrappedExamDetail);