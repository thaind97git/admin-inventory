import { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import Router from 'next/router';
import { Form, Input, Button, Col, Row } from 'antd';
import HeaderContent from '../HeaderContent';
import { DIALOG_SUCCESS, TOAST_ERROR } from '../../utils/actions';
import { formItemLayout, spanCol, doPost } from '../../config';

const connectToRedux = connect(pick(['listProvinces']), dispatch => ({
  displayNotify: (type, message) => {
    dispatch({ type, payload: { message, options: {} } })
  },
  displayDialog: (type, title, content, onOK) => {
    dispatch({ type, payload: { title, content, onOK } })
  }
}))


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
  phone: [
    { required: true, message: "Please input your Phone-number !" },
    { pattern: /^0(1\d{9}|9\d{8})$/, message: "The input is not valid Phone-number !" }
  ]
}

class CreateEmployeeComponent extends Component {
  constructor() {
    super()
  }
  createEmployee = (e, displayDialog, displayNotify, form) => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        if (values.Password !== values.Confirm) {
          displayNotify(TOAST_ERROR, "Password confirm is not matching")
          return;
        }
        try {
          values.Role = 1;
          values.StartDate = new Date()
          values.isActive = true;
          const rs = await doPost({
            path: "/api/Employees",
            body: values
          })
          if (rs && rs.status) {
            displayDialog(DIALOG_SUCCESS, "Create employee success", _, () => Router.push('/employee'))
          }
        } catch (error) {
          displayNotify(TOAST_ERROR, "Create employee fail")
        }
      }
    });
  }
  render() {
    const {
      form,
      displayNotify,
      displayDialog
    } = this.props;
    const { getFieldDecorator } = form;
    const { span, md, lg } = spanCol;
    return (
      <Fragment>
        <HeaderContent title="Create new employee" />
        <div className="padding-table">
          <Form  {...formItemLayout} onSubmit={() =>
            this.createEmployee(event, displayDialog, displayNotify, form)}>
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
                    {getFieldDecorator('Password', {
                      rules: configRule.password
                    })(<Input.Password autoComplete="new-password" placeholder="Please input password" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={span} md={md} lg={lg}>
                  <Form.Item label="Confirm password">
                    {getFieldDecorator('Confirm', {
                      rules: configRule.confirm
                    })(<Input.Password placeholder="Please input confirm password" />)}
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="card">
              <div className="card-header-absolute">Information of employee :</div>
              <Row>
                <Col span={span} md={md} lg={lg}>
                  <Form.Item label="Name of employee">
                    {getFieldDecorator('Name', {
                      rules: configRule.name
                    })(<Input placeholder="Please input name of user" />)}
                  </Form.Item>
                </Col>
                <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                  <Form.Item label="Address">
                    {getFieldDecorator('Address', {})(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={span} md={md} lg={lg}>
                  <Form.Item label="Phone number">
                    {getFieldDecorator('Phone', {
                      rules: configRule.phone
                    })(
                      <Input placeholder="Please input phone of user" />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Row type="flex" align="middle" justify="center">
              <Form.Item>
                <Button type="primary" htmlType="submit" >
                  Create new employee
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </div>
      </Fragment>
    )
  }
}

const WrappedCreateEmployee = Form.create()(CreateEmployeeComponent)

export default connectToRedux(WrappedCreateEmployee);