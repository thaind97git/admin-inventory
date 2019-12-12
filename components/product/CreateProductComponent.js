import { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import Router from 'next/router';
import { bindActionCreators } from 'redux';
import { Form, Input, Button, Col, Row, Select } from 'antd';
import * as AdminState from '../../store/AdminState';
import HeaderContent from '../HeaderContent';
import { DIALOG_SUCCESS, TOAST_ERROR } from '../../utils/actions';
import { formItemLayout, spanCol } from '../../config';
import { doPost } from '../../config'

const { Option } = Select;
const { TextArea } = Input;
const connectToRedux = connect(
  pick(['listCategories', 'listUnits']),
  dispatch => ({
    adminActions: bindActionCreators(AdminState, dispatch),
    displayNotify: (type, message) => {
      dispatch({ type, payload: { message, options: {} } })
    },
    displayDialog: (type, title, content, onOK) => {
      dispatch({ type, payload: { title: title, content: content, onOK: onOK } })
    }
  }))

const configRule = {
  ProductName: [
    { required: true, message: "Please input product name !" }
  ],
  Price: [
    { required: true, message: "Please input price !" }
  ],
  Category: [
    { required: true, message: 'Please choose category !' }
  ],
  UnitId: [
    { required: true, message: "Please choose Unit !" }
  ]
}

class CreateProductComponent extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    const { getListCategoriesAPI, getListUnitsAPI } = this.props.adminActions
    getListCategoriesAPI();
    getListUnitsAPI();
  }
  createStudent = (e, displayDialog, displayNotify, form) => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      values.isActive = true;
      if (!err) {
        try {
          const rs = await doPost({
            path: "/api/Products",
            body: values
          })
          if (rs && rs.status) {
            displayDialog(DIALOG_SUCCESS, "Create product success", _, () => Router.push('/product'))
          }
        } catch (error) {
          displayNotify(TOAST_ERROR, "Create product fail")
        }
      }
    });
  }
  render() {
    const {
      form,
      displayNotify,
      displayDialog,
      listCategories = [],
      listUnits = []
    } = this.props;
    const { getFieldDecorator } = form;
    const { span, md, lg } = spanCol;
    return (
      <Fragment>
        <HeaderContent title="Create new product" />
        <div className="padding-table">
          <Form  {...formItemLayout} onSubmit={() =>
            this.createStudent(event, displayDialog, displayNotify, form)}>
            <div className="card">
              <div className="card-header-absolute">Product informations :</div>
              <Row>
                <Col span={span} md={md} lg={lg}>
                  <Form.Item label="Product Name">
                    {getFieldDecorator('Name', {
                      rules: configRule.ProductName
                    })(<Input placeholder="Please input product name" />)}
                  </Form.Item>
                </Col>
                <Col span={span} md={md} lg={lg}>
                  <Form.Item label="Price">
                    {getFieldDecorator('Price', {
                      rules: configRule.Price
                    })(<Input placeholder="Please input price" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={span} md={md} lg={lg}>
                  <Form.Item label="Choose Category">
                    {getFieldDecorator('CategoryId', {
                      rules: configRule.Category
                    })(<Select placeholder="Please select category">
                      {
                        listCategories.map((item, index) => {
                          return <Option key={index} value={item.CategoryId}>{item.Name}</Option>
                        })
                      }
                    </Select>)}
                  </Form.Item>
                </Col>
                <Col span={span} md={md} lg={lg}>
                  <Form.Item label="Describe">
                    {getFieldDecorator('Describe', {})(
                      <TextArea
                        placeholder="Input describe"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                      />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={span} md={md} lg={lg}>
                  <Form.Item label="Choose Unit">
                    {getFieldDecorator('UnitId', {
                      rules: configRule.UnitId
                    })(<Select placeholder="Please select Unit">
                      {
                        listUnits.map((item, index) => {
                          return <Option key={index} value={item.UnitId}>{item.UnitName}</Option>
                        })
                      }
                    </Select>)}
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Row type="flex" align="middle" justify="center">
              <Form.Item>
                <Button type="primary" htmlType="submit" >
                  Create new product
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </div>
      </Fragment>
    )
  }
}

const WrappedCreateProduct = Form.create()(CreateProductComponent)

export default connectToRedux(WrappedCreateProduct);