import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { TOAST_SUCCESS, TOAST_ERROR } from '../../utils/actions';
import { doGet, doDelete } from '../../config';
import { mapIndex } from '../../utils'
import Link from 'next/link';

import TableComponent from '../TableComponent';
import HeaderContent from '../HeaderContent';
import RenderColumnComponent from '../RenderComlunComponent';
import ButtonLayout from '../../layouts/ButtonLayout';
import ConfirmLayout from '../../layouts/ConfirmLayout';
const connectToRedux = connect(
  null,
  dispatch => ({
    displayDialog: (type, title = "", content = "") => {
      dispatch({ type: type, payload: { title: title, content: content } })
    },
    displayNotify: (type, message) => {
      dispatch({ type: type, payload: { message: message } })
    }
  })
)

const Delete = async (id, displayNotify, isReFetch, setIsReFetch) => {
  try {
    await doDelete({ path: `/api/Employees/${id}` });
    displayNotify(TOAST_SUCCESS, "Delete employee success !");
    setIsReFetch(!isReFetch);
  } catch (error) {
    displayNotify(
      TOAST_ERROR, "Delete employee fail !"
    );
  }
}
const EmployeesComponent = ({ displayNotify }) => {
  const [dataSrc, setDataSrc] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReFetch, setIsReFetch] = useState(false);

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key'
    },
    {
      title: 'Username',
      dataIndex: 'Username'
    },
    {
      title: "Name",
      dataIndex: 'Name'
    },
    {
      title: 'Phone',
      dataIndex: 'Phone'
    },
    {
      title: 'Address',
      dataIndex: 'Address'
    },
    {
      title: 'Create date',
      dataIndex: 'StartDate',
      render: date => <RenderColumnComponent type="date" content={date} />
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      render: val => <RenderColumnComponent type="status" content={val} />
    },
    {
      title: 'Edit',
      dataIndex: 'EmployeeId',
      render: (id, row, index) => {
        return (
          <Fragment>
            <Link href={"/employee/detail?id=" + id} >
              <ButtonLayout text={<Icon type="edit" />} size="small" type="primary"></ButtonLayout>
            </Link>
            <ButtonLayout
              onClick={() => ConfirmLayout({
                title: 'Delete',
                content: 'Do you want delete this record ?',
                okText: 'Delete',
                cancelText: 'No',
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
        const rs = await doGet({ path: "/api/Employees" })
        setIsLoading(false)
        rs && rs.data && setDataSrc(rs.data);
      } catch (error) {
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
      <HeaderContent title="List of employees" />
      <div className="padding-table">
        <TableComponent
          columns={columns}
          isLoading={isLoading}
          data={mapIndex(dataSrc)}
          rowKey={record => record.EmployeeId} />
      </div>
    </Fragment>
  )
}
export default connectToRedux(EmployeesComponent);