import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Form, Input, Button, Col, Row, Radio, Select } from 'antd';
import { requestAPI, formItemLayout, spanCol } from '../../config';
import { momentDateUser, formatDateServer } from '../../utils/dateUtils';
import { TO_HOP_MON } from '../../constant/constants';
import { GET_MAJOR, UPDATE_MAJOR } from '../../constant/UrlApi';
import { DIALOG_SUCCESS, TOAST_ERROR, DIALOG_ERROR } from '../../utils/actions';
import HeaderContent from '../HeaderContent';
import MissinginforComponent from '../MissinginforComponent';

const { Option } = Select;
const connectToRedux = connect(null, dispatch => ({
    displayNotify: (type, message) => {
        dispatch({ type: type, payload: { message: message, options: {} } })
    },
    displayDialog: (type, title, content, onOK) => {
        dispatch({ type: type, payload: { title: title, content: content, onOK } })
    }
}))

const configRule = {
    code: [
        { required: true, message: "Please input major's code !" }
    ],
    name: [
        { required: true, message: "Please input major's name !" }
    ],
    group: [
        { required: true, message: "Please input group's major !" }
    ],
    to_hop: [
        { required: true, message: 'Please input subject combination !' },
    ]
}

class MajorDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            major: {},
            id: Router.query.id,
        }
    }
    async componentWillMount() {
        const { id } = this.state;
        this.setState({ _isMounted: true })
        const opt = {
            method: 'GET',
            url: `${GET_MAJOR}/${id}`
        }
        const getStudent = async () => {
            try {
                const rs = await requestAPI(opt);
                const { data } = rs.data;
                data.to_hop_mon = data.to_hop_mon ? data.to_hop_mon.split(",") : []
                this.setState({ major: data })
                
            } catch (error) {
                console.log(error)
            }
        }
        await getStudent()
    }
    updateMajor = (e) => {
        e.preventDefault();
        const { displayDialog, form, displayNotify } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const majorObj = {
                    name: values.name,
                    ma_nganh: values.ma_nganh,
                    nhom_nganh: values.nhom_nganh,
                    to_hop_mon: values.to_hop_mon.join(','),
                    creator: 0,
                    created: formatDateServer(values.dayProvided),
                    status: +values.status,
                }
                const opt = {
                    url: `${UPDATE_MAJOR}/${this.state.id}`,
                    method: 'PUT',
                    data: majorObj
                }
                requestAPI(opt)
                    .then(({ data }) => {
                        if (data && data.status === 200) {
                            displayDialog(DIALOG_SUCCESS, data.message, '', () => Router.push('/major'))
                        } else {
                            displayNotify(DIALOG_ERROR, data.errorMessage || 'Có lỗi xảy ra')
                        }
                    }).catch(({ response }) => {
                        response && displayNotify(TOAST_ERROR, 'Có lỗi xảy ra')
                    })
            }
        });
    }
    render() {
        const { major = null } = this.state;
        const { span, md, lg } = spanCol;
        const { getFieldDecorator } = this.props.form;
        return (
            !major ? <MissinginforComponent>Not Found</MissinginforComponent>
                : <Fragment>
                    <HeaderContent title="Update Major" />
                    <div className="padding-table">
                        <Form  {...formItemLayout} onSubmit={this.updateMajor}>
                            <div className="card">
                                <div className="card-header-absolute">Major's information :</div>
                                <Row>
                                    <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                        <Form.Item label="Major's code">
                                            {getFieldDecorator('ma_nganh', {
                                                initialValue: major.ma_nganh,
                                                rules: configRule.code
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Major's Name">
                                            {getFieldDecorator('name', {
                                                initialValue: major.name,
                                                rules: configRule.name
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Group's major">
                                            {getFieldDecorator('nhom_nganh', {
                                                initialValue: major.nhom_nganh,
                                                rules: configRule.group
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                        <Form.Item label="Subject combination">
                                            {getFieldDecorator('to_hop_mon', {
                                                initialValue: major.to_hop_mon,
                                                rules: configRule.to_hop
                                            })(
                                                <Select mode="multiple" placeholder="Please select subject combination">
                                                    {
                                                        TO_HOP_MON.map((item, index) => {
                                                            return <Option key={index} value={item}>{item}</Option>
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Date created">
                                            {getFieldDecorator('created', {
                                                initialValue: momentDateUser(major.created)
                                            })(<Input disabled />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                            <Row type="flex" align="middle" justify="center">
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" >
                                        Update Major
                                    </Button>
                                </Form.Item>
                            </Row>
                        </Form>
                    </div>
                </Fragment>
        )
    }
}

const WrappedMajorDetail = Form.create()(MajorDetailComponent)

export default connectToRedux(WrappedMajorDetail);