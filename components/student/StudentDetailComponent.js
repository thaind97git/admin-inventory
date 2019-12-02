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
    DatePicker,
    Radio,
    Avatar,
    Select
} from 'antd';
import * as AdminState from '../../store/AdminState';
import * as StudentState from '../../store/StudentState';
import { requestAPI, formItemLayout, spanCol } from '../../config';
import { GET_STUDENT, UPDATE_STUDENT, GET_PROVINCES } from '../../constant/UrlApi';
import { DIALOG_SUCCESS, TOAST_ERROR, DIALOG_ERROR, TOAST_SUCCESS } from '../../utils/actions';
import { formatDateServer, momentDatePicker, momentTimeSpanPicker } from '../../utils/dateUtils';
import HeaderContent from '../HeaderContent';
import NotFoundComponent from '../MissinginforComponent';

const { Option } = Select;
const connectToRedux = connect(
    pick(['listDistricts', 'listProvinces', 'student', 'listWards', 'listSchools']),
    dispatch => ({
        adminActions: bindActionCreators(AdminState, dispatch),
        studentActions: bindActionCreators(StudentState, dispatch),
        displayNotify: (type, message) => {
            dispatch({ type: type, payload: { message: message, options: {} } })
        },
        displayDialog: (type, title, content, onOK) => {
            dispatch({ type: type, payload: { title, content, onOK } })
        }
    })
)

const configRule = {
    name: [
        { required: true, message: "Please input Username !" }
    ],
    birth: [
        { required: true, message: "Please input your birthday !" }
    ],
    phone: [
        { required: true, message: "Please input your Phone-number !" },
        { pattern: /^0(1\d{9}|9\d{8})$/, message: "The input is not valid Phone-number !" }
    ],
    phone_mom: [
        { pattern: /^0(1\d{9}|9\d{8})$/, message: "The input is not valid Phone-number !" }
    ],
    phone_dad: [
        { pattern: /^0(1\d{9}|9\d{8})$/, message: "The input is not valid Phone-number !" }
    ],
    cmnd: [
        { required: true, message: "Please input Card ID !" }
    ],
    dateProvided: [
        { required: true, message: "Please input date Card ID provided !" }
    ],
    addressID: [
        { required: true, message: "Please input address Card ID provided !" }
    ],
    city: [
        { required: true, message: "Please input province / city !" }
    ]
}

const normFile = e => {
    debugger;
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};
class StudentDetailComponent extends Component {
    constructor() {
        super();
        this.state = {
            id: Router.query.id
        }
    }
    componentWillMount() {
        let didCancel = false;
        if (!didCancel) {
            this.props.studentActions.getStudentDetailAPI(this.state.id)
            this.props.adminActions.getListProvincesAPI();
            this.props.adminActions.getListSchoolsAPI();
        }
        return didCancel = true;
    }
    createStudent = (e) => {
        e.preventDefault();
        const { displayDialog, form, displayNotify } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.ngay_sinh = formatDateServer(values.ngay_sinh);
                values.ngay_cap = formatDateServer(values.ngay_cap);
                const opt = { url: `${UPDATE_STUDENT}/${this.state.id}`, method: 'PUT', data: values }
                requestAPI(opt)
                    .then(({ data }) => {
                        if (data && data.status === 200) {
                            displayDialog(DIALOG_SUCCESS, data.message, '', () => Router.push('/student'))
                        } else {
                            displayDialog(DIALOG_ERROR, data.errorMessage || 'Có lỗi xảy ra')
                        }
                    }).catch(({ response }) => {
                        response && displayNotify(TOAST_ERROR, 'Có lỗi xảy ra')
                    })
            }
        });
    }
    render() {
        const { span, md, lg } = spanCol;
        const {
            form,
            listProvinces = [],
            listDistricts = [],
            student,
            listWards = [],
            listSchools,
            adminActions
        } = this.props;
        const { getFieldDecorator } = form;
        return (
            !student ? <NotFoundComponent />
                : <Fragment>
                    <HeaderContent title="Update Student" />
                    <div className="padding-table">
                        <Form  {...formItemLayout} onSubmit={this.createStudent}>
                            <div className="card">
                                <div className="card-header-absolute">Information of student :</div>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Student's Name">
                                            {getFieldDecorator('name', {
                                                initialValue: student.name,
                                                rules: configRule.name
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                        <Form.Item label="Birthday">
                                            {getFieldDecorator('ngay_sinh', {
                                                initialValue: momentTimeSpanPicker(+student.ngay_sinh),
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
                                                initialValue: student.cmnd,
                                                rules: configRule.cmnd
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                        <Form.Item label="Date ID provided">
                                            {getFieldDecorator('ngay_cap', {
                                                initialValue: momentDatePicker(student.ngay_cap),
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
                                                initialValue: student.noi_cap ? +student.noi_cap : "",
                                                rules: configRule.addressID
                                            })(
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    placeholder="Please select address Card ID provided">
                                                    {
                                                        listProvinces.map((item, index) => {
                                                            return <Option key={index} value={item.id}>
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
                                                initialValue: student.phone,
                                                rules: configRule.phone
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Province / City">
                                            {getFieldDecorator('id_thanh_pho_lien_he', {
                                                initialValue: student.id_thanh_pho_lien_he,
                                                rules: configRule.city
                                            })(
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    placeholder="Please select Province / City"
                                                    onChange={(id) => {
                                                        student.id_quan_huyen_lien_he = null;
                                                        student.id_phuong_xa_lien_he = null;
                                                        adminActions.getListDistrictsAPI(id)
                                                    }}>
                                                    {
                                                        listProvinces.map((item, index) => {
                                                            return <Option key={index} value={item.id}>
                                                                {item.name}
                                                            </Option>
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    {/* <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="District">
                                            {getFieldDecorator('id_quan_huyen_lien_he', {
                                                initialValue: student.id_quan_huyen_lien_he,
                                            })(
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    placeholder="Please select District"
                                                    onChange={(idDistrict) => {
                                                        adminActions.getListWardsAPI(idDistrict)
                                                    }}>
                                                    {
                                                        // listDistricts.length === 0 ? 
                                                        // <Option value={student.id_quan_huyen_lien_he}>
                                                        //     {student.quan_huyen_lien_he}
                                                        // </Option> :
                                                        listDistricts.map((item, index) => {
                                                            return <Option key={index} value={item.id}>
                                                                {item.name}
                                                            </Option>
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col> */}
                                </Row>

                                <Row>
                                    {/* <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Ward">
                                            {getFieldDecorator('id_phuong_xa_lien_he', {
                                                initialValue: student.id_phuong_xa_lien_he,
                                            })(
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    placeholder="Please select Ward">
                                                    {
                                                        // listWards.length === 0 ? 
                                                        // <Option value={student.id_phuong_xa_lien_he}>
                                                        //     {student.phuong_xa_lien_he}
                                                        // </Option> :
                                                        listWards.map((item, index) => {
                                                            return <Option key={index} value={item.id}>
                                                                {item.name}
                                                            </Option>
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col> */}
                                </Row>
                                <Row>
                                    <Row>
                                        <Col span={span} md={md} lg={lg}>
                                            <Form.Item label="Area hight school">
                                                {getFieldDecorator('id_tinh_thanh_pho_truong_thpt', {
                                                    initialValue: student.id_tinh_thanh_pho_truong_thpt
                                                })(
                                                    <Select
                                                        showSearch
                                                        optionFilterProp="children"
                                                        placeholder="Please select District" >
                                                        {
                                                            listProvinces.map((item, index) => {
                                                                return <Option key={index} value={+item.id}>
                                                                    {item.name}
                                                                </Option>
                                                            })
                                                        }
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={span} md={md} lg={lg}>
                                            <Form.Item label="Hight school">
                                                {getFieldDecorator('truong_thpt', {
                                                    initialValue: student.truong_thpt,
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={span} md={md} lg={lg}>
                                            <Form.Item label="Address street">
                                                {getFieldDecorator('so_nha_ten_duong', {
                                                    initialValue: student.so_nha_ten_duong
                                                })(<Input />)}
                                            </Form.Item>
                                        </Col>
                                        <Col span={span} md={md} lg={lg}>
                                            <Form.Item label="Full address">
                                                {getFieldDecorator('dia_chi_day_du', {
                                                    initialValue: student.dia_chi_day_du
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={span} md={md} lg={lg}>
                                            <Form.Item label="Avatar">
                                                {getFieldDecorator('avatar')(
                                                    <Avatar src={student.avatar} size="large" />
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={span} md={md} lg={lg}>
                                            <Form.Item label="Sex">
                                                {getFieldDecorator('gioi_tinh', {
                                                    initialValue: student.gioi_tinh
                                                })(
                                                    <Radio.Group>
                                                        <Radio value={2}>Fmale</Radio>
                                                        <Radio value={1}>Male</Radio>
                                                    </Radio.Group>
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Row>
                            </div>

                            <div className="card">
                                <div className="card-header-absolute">Student family :</div>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Father name">
                                            {getFieldDecorator('ho_ten_bo', {
                                                initialValue: student.ho_ten_bo
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Father phone">
                                            {getFieldDecorator('dien_thoai_bo', {
                                                initialValue: student.dien_thoai_bo,
                                                rules: configRule.phone_dad
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Father job">
                                            {getFieldDecorator('nghe_nghiep_bo', {
                                                initialValue: student.nghe_nghiep_bo
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Mother name">
                                            {getFieldDecorator('ho_ten_me', {
                                                initialValue: student.ho_ten_me
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Mother phone">
                                            {getFieldDecorator('dien_thoai_me', {
                                                initialValue: student.dien_thoai_me,
                                                rules: configRule.phone_mom
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Mother job">
                                            {getFieldDecorator('nghe_nghiep_me', {
                                                initialValue: student.nghe_nghiep_me
                                            })(<Input />)}
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