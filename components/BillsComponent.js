import React, { Fragment, useState, useEffect } from 'react';
import { Icon } from 'antd';
import { pick } from 'lodash/fp';
import { connect } from 'react-redux';
import { doGet } from '../config/index';
import Link from 'next/link';
import { mapIndex } from '../utils';

import TableComponent from './TableComponent';
import ButtonLayout from '../layouts/ButtonLayout';
import HeaderContent from './HeaderContent';
import RenderColumnComponent from './RenderComlunComponent';
import BillTypeComponent from './BillTypeComponent';

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

const BillsComponent = ({ displayNotify }) => {
  const [dataSrc, setDataSrc] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      title: 'No.',
      dataIndex: 'key'
    },
    {
      title: 'DateCreated',
      dataIndex: 'DateCreated',
      render: date => <RenderColumnComponent type="date" content={date} />
    },
    {
      title: 'Date Modified',
      dataIndex: 'DateModified',
      render: date => <RenderColumnComponent type="date" content={date} />
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      render: type => <BillTypeComponent type={type} />
    },
    {
      title: 'Inventory',
      dataIndex: 'Inventory',
      render: inventory => <Link href={`/inventory/detail?id=${inventory.InventoryId}`}>{inventory.Name}</Link>
    },
    {
      title: 'Employee',
      dataIndex: 'Employee',
      render: employee => <Link href={`/employee/detail?id=${employee.EmployeeId}`}>{employee.Name}</Link>
    },
    {
      title: 'Amount',
      dataIndex: 'TotalAmount',
      render: amount => <RenderColumnComponent type="price" content={amount} />
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      render: status => <RenderColumnComponent type="status" content={status} />
    },
    {
      title: 'Details',
      dataIndex: 'BillId',
      render: (id, row, index) => {
        return (
          <Fragment>
            <Link href={"/bill/detail?id=" + id} >
              <ButtonLayout text={<Icon type="eye" />} type="primary"></ButtonLayout>
            </Link>
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
          path: "/api/Bills"
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
  }, [])

  return (
    <Fragment>
      <HeaderContent title="List Bills" />
      <div className="padding-table">
        <TableComponent
          columns={columns}
          isLoading={isLoading}
          data={mapIndex(dataSrc)}
          rowKey={record => record.key} />
      </div>
    </Fragment>
  )
}
export default connectToRedux(BillsComponent);