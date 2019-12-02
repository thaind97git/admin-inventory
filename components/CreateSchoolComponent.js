import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Row } from 'antd';
import HeaderContent from '../components/HeaderContent';
import { CREATE_SCHOOL } from '../constant/UrlApi';
import { DIALOG_SUCCESS, TOAST_ERROR } from '../utils/actions';
import { requestAPI, formItemLayout } from '../config';
import Router from 'next/router';

const connectToRedux = connect(null, dispatch => ({
    displayNotify: (type, message) => {
        dispatch({ type: type, payload: { message: message, options: {} } })
    },
    displayDialog: (type, title, content, onOK) => {
        dispatch({ type: type, payload: { title: title, content: content, onOK } })
    },
}))



const CreateStudentComponent = ({ form, displayNotify, displayDialog }) => {
    const { getFieldDecorator } = form;
    const [loadingButton, setLoadingButton] = useState(false);
    const createSchool = (e) => {
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                setLoadingButton(true);
                const opt = {
                    url: CREATE_SCHOOL,
                    method: 'POST',
                    data: values
                }
                requestAPI(opt)
                    .then(({ data }) => {
                        setLoadingButton(false)
                        if (data && data.status === 200) {
                            displayDialog(DIALOG_SUCCESS, data.message, '', () => Router.push('/school'))
                        } else {
                            displayNotify(TOAST_ERROR, data.errorMessage || 'Có lỗi xảy ra')
                        }
                    }).catch(({ response }) => {
                        setLoadingButton(false)
                        response && displayNotify(TOAST_ERROR, 'Có lỗi xảy ra')
                    })
            }
        });
    }
    const formItemLayout2 = Object.assign(formItemLayout, {
        labelCol: {
            lg: { span: 4 }
        },
        wrapperCol: {
            lg: { span: 20 }
        }
    })
    return (
        <Fragment>
            <HeaderContent title="Create new school" />
            <div className="padding-table">
                <Form  {...formItemLayout2} onSubmit={() => createSchool(event)}>
                    <Row>
                            <Form.Item label="School's name">
                                {getFieldDecorator('name', {
                                    rules: [
                                        { required: true, message: "Please input major's name !" }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                    </Row>
                    <Row type="flex" align="middle" justify="center">
                        <Form.Item>
                            <Button loading={loadingButton} type="primary" htmlType="submit" >
                                Create new school
                        </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </div>
        </Fragment>
    )
}

const WrappedCreateStudent = Form.create()(CreateStudentComponent)

export default connectToRedux(WrappedCreateStudent);