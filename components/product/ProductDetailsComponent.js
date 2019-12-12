import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import { pick } from 'lodash/fp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Select
} from 'antd';
import * as AdminState from '../../store/AdminState';
import * as ProductState from '../../store/ProductState';
import { doPut, formItemLayout, spanCol } from '../../config';
import { DIALOG_SUCCESS, TOAST_ERROR, DIALOG_ERROR } from '../../utils/actions';
import { formatDateServer } from '../../utils/dateUtils';
import HeaderContent from '../HeaderContent';
import NotFoundComponent from '../MissinginforComponent';
import { isEmptyObject } from '../../utils'

const { Option } = Select;
const { TextArea } = Input;
const connectToRedux = connect(
  pick(['listCategories', 'listUnits', 'product']),
  dispatch => ({
    adminActions: bindActionCreators(AdminState, dispatch),
    productActions: bindActionCreators(ProductState, dispatch),
    displayNotify: (type, message) => {
      dispatch({ type: type, payload: { message: message, options: {} } })
    },
    displayDialog: (type, title, content, onOK) => {
      dispatch({ type: type, payload: { title, content, onOK } })
    }
  })
)

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
class ProductDetailsComponent extends Component {
  constructor() {
    super();
    this.state = {
      id: Router.query.id
    }
  }
  componentDidMount() {
    const { getListCategoriesAPI, getListUnitsAPI } = this.props.adminActions
    const { getProductDetailsAPI } = this.props.productActions;
    getListCategoriesAPI();
    getListUnitsAPI();
    getProductDetailsAPI(this.state.id);
  }
  createStudent = (e) => {
    e.preventDefault();
    const { displayDialog, form, displayNotify } = this.props;
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          console.log(Object.assign({}, this.props.product, values))
          const rs = await doPut({
            path: "/api/Products/" + this.state.id,
            body: Object.assign({}, this.props.product, values)
          })
          rs && rs.data && displayDialog(
            DIALOG_SUCCESS,
            "Update product success",
            '',
            () => Router.push('/product')
          )
        } catch (error) {
          console.log(error)
          displayNotify(TOAST_ERROR, 'Can not update product')
        }
      }
    });
  }
  render() {
    const { span, md, lg } = spanCol;
    const {
      form,
      product,
      listCategories = [],
      listUnits = []
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      isEmptyObject(product) ? <NotFoundComponent> Can not find any product</NotFoundComponent>
        : <Fragment>
          <HeaderContent title="Update product" />
          <div className="padding-table">
            <Form  {...formItemLayout} onSubmit={this.createStudent}>
              <div className="card">
                <div className="card-header-absolute">Information of product :</div>
                <Row>
                  <Col span={span} md={md} lg={lg}>
                    <Form.Item label="Product Name">
                      {getFieldDecorator('Name', {
                        initialValue: product.Name,
                        rules: configRule.ProductName
                      })(<Input placeholder="Please input product name" />)}
                    </Form.Item>
                  </Col>
                  <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                    <Form.Item label="Price">
                      {getFieldDecorator('Price', {
                        initialValue: product.Price,
                        rules: configRule.Price
                      })(
                        <Input placeholder="Please input price" />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={span} md={md} lg={lg}>
                    <Form.Item label="Choose Category">
                      {getFieldDecorator('CategoryId', {
                        initialValue: product.CategoryId,
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
                  <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                    <Form.Item label="Describe">
                      {getFieldDecorator('Describe', {
                        initialValue: product.Describe
                      })(
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
                        initialValue: product.UnitId,
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
                    Update Product
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </div>
        </Fragment>
    )
  }
}

const WrappedProductDetails = Form.create()(ProductDetailsComponent)

export default connectToRedux(WrappedProductDetails);