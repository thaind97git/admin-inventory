import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import { Icon, Button, Input, Modal } from 'antd';
import { doGet, doPost } from '../../config';
import { mapIndex } from '../../utils';
import Link from 'next/link';

import HeaderContent from '../HeaderContent';
import Tablecomponent from '../TableComponent';
import ButtonLayout from '../../layouts/ButtonLayout';
import RenderColumnComponent from '../RenderComlunComponent';
import ConfirmLayout from "../../layouts/ConfirmLayout";
import { TOAST_ERROR, TOAST_SUCCESS } from '../../utils/actions';

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

const createUnit = async ({
  displayNotify,
  isReFetch,
  setIsReFetch,
  unitName
}) => {
  if (unitName === "") {
    displayNotify(TOAST_ERROR, 'Create new unit fail !');
    return;
  }
  try {
    await doPost({
      path: "/api/Units",
      body: {
        "UnitName": unitName
      }
    })
    displayNotify(TOAST_SUCCESS, "Create new unit success !");
    setIsReFetch(!isReFetch)
  } catch (error) {
    console.log(error)
    displayNotify(
      TOAST_ERROR, "Create new unit fail !"
    );
  }
}

const UnitsComponent = ({ displayDialog, displayNotify }) => {
  const [dataSrc, setDataSrc] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReFetch, setIsReFetch] = useState(false);
  const [unitName, setUnitName] = useState("")
  const [modalCreate, setModalCreate] = useState(false)
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
      <Modal
        title="Create new Unit"
        visible={modalCreate}
        onOk={() => createUnit({ displayNotify, isReFetch, setIsReFetch, unitName })}
        onCancel={() => setModalCreate(false)}
        okText="Create"
        cancelText="Cancel"
      >
        <Input value={unitName} onChange={e => setUnitName(e.target.value)} placeholder="input unit name" />
      </Modal>
      <Button onClick={() => { setModalCreate(true) }} type="primary" htmlType="submit" >
        Create new unit
      </Button>
      <br />
    </Fragment>
  )
}

export default connectToRedux(UnitsComponent)