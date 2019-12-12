import React, { Fragment, useState, useEffect } from "react";
import { Icon } from "antd";
import { connect } from "react-redux";
import { TOAST_SUCCESS, TOAST_ERROR } from "../../utils/actions";
import { doGet, doDelete } from "../../config/index";
import Link from "next/link";

import { mapIndex } from '../../utils'

import TableComponent from "../TableComponent";
import ButtonLayout from "../../layouts/ButtonLayout";
import ConfirmLayout from "../../layouts/ConfirmLayout";
import HeaderContent from "../HeaderContent";
import RenderColumnComponent from "../RenderComlunComponent";


const connectToRedux = connect(null, dispatch => ({
  displayDialog: (type, title = "", content = "") => {
    dispatch({ type, payload: { title, content } });
  },
  displayNotify: (type, message) => {
    dispatch({ type, payload: { message } });
  }
}));

const Delete = async (id, displayNotify, isReFetch, setIsReFetch) => {
  try {
    await doDelete({ path: `/api/Products/${id}` });
    displayNotify(TOAST_SUCCESS, "Delete product success !");
    setIsReFetch(!isReFetch);
  } catch (error) {
    displayNotify(
      TOAST_ERROR, "Delete product fail !"
    );
  }
};

const StudentComponent = ({ displayNotify }) => {
  const [dataSrc, setDataSrc] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReFetch, setIsReFetch] = useState(false);
  const columns = [
    {
      title: "No.",
      dataIndex: "key"
    },
    {
      title: "Product name",
      dataIndex: "Name",
      render: val => <RenderColumnComponent content={val} />
    },
    {
      title: "Price",
      dataIndex: "Price",
      render: val => <RenderColumnComponent type="price" content={val} />
    },
    {
      title: "Categogy",
      dataIndex: "Category",
      render: val => <RenderColumnComponent content={val.Name} />
    },
    {
      title: "Unit",
      dataIndex: "Unit",
      render: val => <RenderColumnComponent content={val.UnitName} />
    },
    {
      title: "Describe",
      dataIndex: "Describe",
      render: val => <RenderColumnComponent content={val} />
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      render: val => <RenderColumnComponent type="status" content={val} />
    },
    {
      title: "Edit",
      dataIndex: "ProductId",
      render: (id, row, index) => {
        return (
          <Fragment>
            <Link href={"/product/detail?id=" + id}>
              <ButtonLayout
                text={<Icon type="edit" />}
                size="small"
                type="primary"
              ></ButtonLayout>
            </Link>
            <ButtonLayout
              onClick={() =>
                ConfirmLayout({
                  title: "Delete",
                  content: "Do you want delete this record ?",
                  okText: "Delete",
                  cancelText: "No",
                  functionOk: () =>
                    Delete(id, displayNotify, isReFetch, setIsReFetch)
                })
              }
              size="small"
              value={id}
              type="danger"
              text="Delete"
            />
          </Fragment>
        );
      }
    }
  ];
  useEffect(() => {
    let didCancel = false;
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const rs = await doGet({
          path: "/api/Products"
        })
        setIsLoading(false)
        if (rs && rs.data) {
          setDataSrc(rs.data);
        }
      } catch (error) {
        setIsLoading(false)
      }
    };
    !didCancel && fetchData();
    return () => {
      didCancel = true;
    };
  }, [isReFetch]);

  return (
    <Fragment>
      <HeaderContent title="List Product" />
      <div className="padding-table">
        <TableComponent
          columns={columns}
          isLoading={isLoading}
          data={mapIndex(dataSrc)}
          rowKey={record => record.ProductId}
        />
      </div>
    </Fragment>
  );
};
export default connectToRedux(StudentComponent);
