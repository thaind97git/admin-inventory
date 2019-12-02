import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Col, Row, Select } from 'antd';
import HeaderContent from '../HeaderContent';
import { CREATE_MAJOR } from '../../constant/UrlApi';
import { DIALOG_SUCCESS, TOAST_ERROR } from '../../utils/actions';
import { requestAPI, formItemLayout, spanCol } from '../../config';
import { TO_HOP_MON } from '../../constant/constants';
import Router from 'next/router';

const { Option } = Select;
const connectToRedux = connect(null, dispatch => ({
    displayNotify: (type, message) => {
        dispatch({ type: type, payload: { message: message, options: {} } })
    },
    displayDialog: (type, title, content, onOK) => {
        dispatch({ type: type, payload: { title: title, content: content, onOK } })
    },
}))

const configRule = {
    code: [
        { required: true, message: "Please input major code !" }
    ],
    name: [
        { required: true, message: "Please input major name !" }
    ],
    group: [
        { required: true, message: "Please input group major !" }
    ],
    to_hop: [
        { required: true, message: 'Please input subject combination !' },
    ]
}


const CreateMajorComponent = ({ form, displayNotify, displayDialog }) => {
    const { getFieldDecorator } = form;
    const [loadingButton, setLoadingButton] = useState(false);
    const { span, md, lg } = spanCol;
    const createMajor = (e) => {
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.to_hop_mon = values.to_hop_mon.join(',');
                values.created = new Date().getTime()
                setLoadingButton(true);
                const opt = {
                    url: CREATE_MAJOR,
                    method: 'POST',
                    data: values
                }
                console.log(values)
                requestAPI(opt)
                    .then(({ data }) => {
                        setLoadingButton(false)
                        if (data && data.status === 200) {
                            displayDialog(DIALOG_SUCCESS, data.message, '', () => Router.push('/major'))
                        } else {
                            displayNotify(TOAST_ERROR, data.errorMessage || 'Có lỗi xảy ra')
                        }
                    }).catch(({ response }) => {
                        setLoadingButton(false)
                        response && displayNotify(TOAST_ERROR, response.errorMessage || 'Có lỗi xảy ra')
                    })
            }
        });
    }
    return (
        <Fragment>
            <HeaderContent title="Create new major" />
            <div className="padding-table">
                <Form  {...formItemLayout} onSubmit={() => createMajor(event)}>
                    <Row>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Major name">
                                {getFieldDecorator('name', {
                                    rules: configRule.name
                                })(<Input placeholder="Please input name of major"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Major code">
                                {getFieldDecorator('ma_nganh', {
                                    rules: configRule.code
                                })(<Input placeholder="Please input code of major"/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Subject combination">
                                {getFieldDecorator('to_hop_mon', {
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
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Major group" >
                                {getFieldDecorator('nhom_nganh', {
                                    rules: configRule.group
                                })(<Input placeholder="Please input group of major"/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle" justify="center">
                        <Form.Item>
                            <Button loading={loadingButton} type="primary" htmlType="submit" >
                                Create new major
                        </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </div>
        </Fragment>
    )
}

const WrappedCreateMajor = Form.create()(CreateMajorComponent)

export default connectToRedux(WrappedCreateMajor);