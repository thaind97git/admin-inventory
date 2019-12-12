import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import { Icon } from 'antd';
import { doGet } from '../config';
import { mapIndex } from '../utils';
import Link from 'next/link';

import HeaderContent from './HeaderContent';
import Tablecomponent from './TableComponent';
import ButtonLayout from '../layouts/ButtonLayout';
import RenderColumnComponent from './RenderComlunComponent';

const connectToRedux = connect(
  pick(['']),
  dispatch => ({
    displayNotify: (type, message) => {
      dispatch({ type, payload: { message, options: {} } })
    },
    displayDialog: (type, title, content, onOK) => {
      dispatch({ type, payload: { title, content, onOK } })
    }
  })
)

const UnitsComponent = ({ displayDialog }) => {
  const [dataSrc, setDataSrc] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReFetch, setIsReFetch] = useState(false);
  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      width: "20%"
    },
    {
      title: 'Unit Name',
      dataIndex: 'UnitName',
      render: name => <RenderColumnComponent content={name} />,
      width: "60%"
    },
    {
      title: 'Edit',
      dataIndex: 'UnitId',
      render: (id, row, index) => {
        return (
          <Fragment>
            <Link href={"/unit/detail?id=" + id} >
              <ButtonLayout text={<Icon type="edit" />} size="small" type="primary"></ButtonLayout>
            </Link>
            <ButtonLayout
              onClick={() => ConfirmLayout({
                title: 'Delete', content: 'Do you want delete this record ?',
                okText: 'Delete', cancelText: 'No', functionOk: () => Delete(row.id, displayNotify, isReFetch, setIsReFetch)
              })} size="small" value={row.id} type="danger" text="Delete"
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
          path: "/api/Units"
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
      <HeaderContent title="List units" />
      <div className="padding-table">
        <Tablecomponent
          columns={columns}
          isLoading={isLoading}
          data={mapIndex(dataSrc)}
          rowKey={record => record.UnitId} />
      </div>
    </Fragment>
  )
}

export default connectToRedux(UnitsComponent)