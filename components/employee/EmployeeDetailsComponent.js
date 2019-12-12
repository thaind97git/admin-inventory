import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Form, Input, Button, Col, Row } from 'antd';
import { pick } from 'lodash/fp';
import { bindActionCreators } from 'redux';
import * as AdminState from '../../store/AdminState';
import HeaderContent from '../HeaderContent';
import { formItemLayout, spanCol, doPut } from '../../config';
import MissinginforComponent from '../MissinginforComponent';
import { isEmptyObject } from '../../utils';
import { TOAST_ERROR } from '../../utils/actions';

const connectToRedux = connect(
  pick(['employee']),
  dispatch => ({
    adminActions: bindActionCreators(AdminState, dispatch),
    displayNotify: (type, message) => {
      dispatch({ type, payload: { message, options: {} } })
    },
    displayDialog: (type, title, content, onOK) => {
      dispatch({ type, payload: { title, content, onOK } })
    },
  })
)

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

class EmployeeDetailsComponent extends Component {
  constructor() {
    super();
    this.state = {
      id: Router.query.id
    }
  }
  componentDidMount() {
    const { getEmployeeByIdAPI } = this.props.adminActions
    getEmployeeByIdAPI(this.state.id)
  }
  updateEmployee = (e) => {
    e.preventDefault();
    const { displayDialog, form, displayNotify } = this.props;
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          const rs = await doPut({
            path: "/api/Employees",
            body: values
          })
          rs && rs.data && displayDialog(
            DIALOG_SUCCESS,
            "Update employee success",
            '',
            () => Router.push('/employee')
          )
        } catch (error) {
          displayNotify(TOAST_ERROR, 'Can not update employee')
        }
      }
    });
  }
  render() {
    const { employee = {}, form } = this.props;
    const { span, md, lg } = spanCol;
    const { getFieldDecorator } = form;
    return (
      isEmptyObject(employee) ? <MissinginforComponent>Not Found any employee</MissinginforComponent>
        : <Fragment>
          <HeaderContent title="Update Employee" />
          <div className="padding-table">
            <Form  {...formItemLayout} onSubmit={this.updateEmployee}>
              <div className="card">
                <div className="card-header-absolute">Information of employee :</div>
                <Row>
                  <Col span={span} md={md} lg={lg}>
                    <Form.Item label="Username">
                      {getFieldDecorator('username', {
                        initialValue: employee.Username,
                        rules: configRule.username
                      })(<Input placeholder="Please input username" />)}
                    </Form.Item>
                  </Col>
                  <Col span={span} md={md} lg={lg}>
                    <Form.Item label="Name of employee">
                      {getFieldDecorator('Name', {
                        initialValue: employee.Name,
                        rules: configRule.name
                      })(<Input placeholder="Please input name of user" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>

                  <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                    <Form.Item label="Address">
                      {getFieldDecorator('Address', {
                        initialValue: employee.Address
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={span} md={md} lg={lg}>
                    <Form.Item label="Phone number">
                      {getFieldDecorator('Phone', {
                        initialValue: employee.Phone,
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
                    Update Employee
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </div>
        </Fragment>
    )
  }
}

const WrappedEmployeeDetail = Form.create()(EmployeeDetailsComponent)

export default connectToRedux(WrappedEmployeeDetail);