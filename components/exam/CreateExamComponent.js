import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Col, Row, Select, DatePicker, TimePicker } from 'antd';
import HeaderContent from '../HeaderContent';
import { CREATE_EXAM } from '../../constant/UrlApi';
import { DIALOG_SUCCESS, TOAST_ERROR } from '../../utils/actions';
import { requestAPI, formItemLayout, spanCol } from '../../config';
import Router from 'next/router';
import { formatDateServer, formatTimeServer } from '../../utils/dateUtils';

const { TextArea } = Input;
const connectToRedux = connect(null, dispatch => ({
    displayNotify: (type, message) => {
        dispatch({ type: type, payload: { message: message, options: {} } })
    },
    displayDialog: (type, title, content, onOK) => {
        dispatch({ type: type, payload: { title: title, content: content, onOK } })
    },
}))

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


const CreateExamComponent = ({ form, displayNotify, displayDialog }) => {
    const { getFieldDecorator } = form;
    const [loadingButton, setLoadingButton] = useState(false);
    const { span, md, lg } = spanCol;
    const createExam = (e) => {
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.ngay_thi = formatDateServer(values.ngay_thi);
                values.ngay_bat_dau = formatDateServer(values.ngay_bat_dau);
                values.ngay_ket_thuc = formatDateServer(values.ngay_ket_thuc);
                values.gio_thi = formatTimeServer(values.gio_thi);
                setLoadingButton(true);
                const opt = {
                    url: CREATE_EXAM,
                    method: 'POST',
                    data: values
                }
                requestAPI(opt)
                    .then(({ data }) => {
                        setLoadingButton(false)
                        if (data && data.status === 200) {
                            displayDialog(DIALOG_SUCCESS, data.message, '', () => Router.push('/exam'))
                        } else {
                            displayNotify(TOAST_ERROR, data.errorMessage || 'Có lỗi xảy ra')
                        }
                    }).catch(({ response }) => {
                        setLoadingButton(false)
                        response ? displayNotify(TOAST_ERROR, response.errorMessage || 'Có lỗi xảy ra')
                        : displayNotify(TOAST_ERROR, 'Có lỗi xảy ra')
                    })
            }
        });
    }
    return (
        <Fragment>
            <HeaderContent title="Create new exam" />
            <div className="padding-table">
                <Form  {...formItemLayout} onSubmit={() => createExam(event)}>
                    <Row>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Exam name">
                                {getFieldDecorator('name', {
                                    rules: configRule.name
                                })(<Input placeholder="Please input name of exam"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Exam type">
                                {getFieldDecorator('loai_ky_thi', {
                                    rules: configRule.type
                                })(<Input placeholder="Please input type of exam"/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item style={{ textAlign: 'left' }} label="Date exam">
                                {getFieldDecorator('ngay_thi', {
                                    rules: configRule.date
                                })(
                                    <DatePicker format="DD/MM/YYYY" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item style={{ textAlign: 'left' }} label="Exam time" >
                                {getFieldDecorator('gio_thi', {
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
                                    rules: configRule.start
                                })(
                                    <DatePicker format="DD/MM/YYYY" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item style={{ textAlign: 'left' }} label="Date end" >
                                {getFieldDecorator('ngay_ket_thuc', {
                                    rules: configRule.end
                                })(<DatePicker format="DD/MM/YYYY" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Description">
                                {getFieldDecorator('ghi_chu')(
                                    <TextArea/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle" justify="center">
                        <Form.Item>
                            <Button loading={loadingButton} type="primary" htmlType="submit" >
                                Create new exam
                        </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </div>
        </Fragment>
    )
}

const WrappedCreateExam = Form.create()(CreateExamComponent)

export default connectToRedux(WrappedCreateExam);