import React, { Fragment, useState, useEffect } from 'react';
import { Icon } from 'antd';
import { pick } from 'lodash/fp';
import { connect } from 'react-redux';
import { GET_EXAMS, DELETE_EXAM } from '../../constant/UrlApi';
import { TOAST_SUCCESS, TOAST_ERROR } from '../../utils/actions';
import { requestAPI, doGet } from '../../config/index';
import Link from 'next/link';
import { mapIndex } from '../../utils';

import TableComponent from '../TableComponent';
import ButtonLayout from '../../layouts/ButtonLayout';
import ConfirmLayout from '../../layouts/ConfirmLayout';
import HeaderContent from '../HeaderContent';
import RenderColumnComponent from '../RenderComlunComponent';

const connectToRedux = connect(
  pick(['']),
  dispatch => ({
    displayNotify: (type, message) => {
      dispatch({ type: type, payload: { message: message, options: {} } })
    },
    displayDialog: (type, title, content, onOK) => {
      dispatch({ type: type, payload: { title: title, content: content, onOK } })
    },
  })
)


const Delete = (id, displayNotify, isReFetch, setIsReFetch) => {
}

const InventoriesComponent = ({ displayNotify }) => {
  const [dataSrc, setDataSrc] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReFetch, setIsReFetch] = useState(false);
  const columns = [
    {
      title: 'No.',
      dataIndex: 'key'
    },
    {
      title: 'Inventory name',
      dataIndex: 'Name'
    },
    {
      title: 'Address',
      dataIndex: 'Address'
    },
    {
      title: 'Describe',
      dataIndex: 'Describe'
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
            <Link href={"/inventory/detail?id=" + id} >
              <ButtonLayout text={<Icon type="edit" />} size="small" type="primary"></ButtonLayout>
            </Link>
            <ButtonLayout
              onClick={() => ConfirmLayout({
                title: 'Delete', content: 'Do you want delete this record ?',
                okText: 'Delete', cancelText: 'No', functionOk: () => Delete(id, displayNotify, isReFetch, setIsReFetch)
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
          path: "/api/Inventories"
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
      <HeaderContent title="List Inventories" />
      <div className="padding-table">
        <TableComponent
          columns={columns}
          isLoading={isLoading}
          data={mapIndex(dataSrc)}
          rowKey={record => record.InventoryId} />
      </div>
    </Fragment>
  )
}
export default connectToRedux(InventoriesComponent);