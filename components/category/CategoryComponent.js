import React, { Fragment, useState, useEffect } from 'react';
import { Pagination, Row, Col, Input, Form, Checkbox, Icon, Tag } from 'antd';
import Link from 'next/link';
import { pick } from 'lodash/fp';
import { connect } from 'react-redux';
import { DELETE_MAJOR } from '../../constant/UrlApi';
import { TOAST_SUCCESS, TOAST_ERROR } from '../../utils/actions';
import { requestAPI, doGet } from '../../config';
import { mapIndex } from '../../utils';

import TableComponent from '../TableComponent';

import ButtonLayout from '../../layouts/ButtonLayout';
import ConfirmLayout from '../../layouts/ConfirmLayout';
import HeaderContent from '../HeaderContent';
import RenderColumnComponent from '../RenderComlunComponent';
const connectToRedux = connect(
  pick(['isLoading']),
  dispatch => ({
    displayDialog: (type, title = "", content = "") => {
      dispatch({ type, payload: { title, content } })
    },
    displayNotify: (type, message) => {
      dispatch({ type, payload: { message } })
    },
  })
)

const Delete = (id, displayNotify, isReFetch, setIsReFetch) => {
  requestAPI({ method: 'DELETE', url: `${DELETE_MAJOR}/${id}` })
    .then(({ data }) => {
      if (data && data.status === 200) {
        displayNotify(TOAST_SUCCESS, 'Xóa ngành học thành công !')
        setIsReFetch(!isReFetch);
      } else {
        displayNotify(TOAST_ERROR, data.errorMessage || 'Xóa ngành học thất bại !')
      }
      return;
    })
    .catch(() => displayNotify(TOAST_ERROR, 'Xóa ngành học thất bại !'))
}

const CategoryComponent = ({ displayNotify }) => {
  const [dataSrc, setDataSrc] = useState([]);
  const [isReFetch, setIsReFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      title: 'No.',
      dataIndex: 'key'
    },
    {
      title: 'Category name',
      dataIndex: 'Name',
      render: name => <RenderColumnComponent content={name} />
    },
    {
      title: 'Describe',
      dataIndex: 'Describe',
      render: code => <RenderColumnComponent content={code} />
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      render: status => <RenderColumnComponent type="status" content={status} />
    },
    {
      title: 'Edit',
      dataIndex: 'id',
      render: (id, row, index) => {
        return (
          <Fragment>
            <Link href={"/category/detail?id=" + id} >
              <ButtonLayout text={<Icon type="edit" />} size="small" type="primary"></ButtonLayout>
            </Link>
            <ButtonLayout
              onClick={() => ConfirmLayout({
                title: 'Delete', content: 'Do you want delete this record ?',
                okText: 'Delete', cancelText: 'No',
                functionOk: () => Delete(id, displayNotify, isReFetch, setIsReFetch)
              })} size="small" value={id} type="danger" text="Delete"
            />
          </Fragment>
        )
      },
    },
  ];


  useEffect(() => {
    let didCancel = false;
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const rs = await doGet({
          path: "/api/Categories"
        })
        setIsLoading(false)
        if (rs && rs.data) {
          setDataSrc(rs.data);
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    };
    !didCancel && fetchData();
    return () => {
      didCancel = true;
    };
  }, [isReFetch])
  return (
    <Fragment>
      <HeaderContent title="List Categories" />
      <div className="padding-table">
        <TableComponent
          columns={columns}
          isLoading={isLoading}
          data={mapIndex(dataSrc)}
          rowKey={record => record.CategoryId} />
      </div>
    </Fragment>
  )
}
const WrappedCategory = Form.create()(CategoryComponent)
export default connectToRedux(WrappedCategory);