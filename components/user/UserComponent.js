import React, { Component, Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination, Icon } from 'antd';
import { PAGE_SIZE, PAGE_INDEX } from '../../constant/constants';
import { DELETE_USER, GET_USERS, UPDATE_USER } from '../../constant/UrlApi';
import { TOAST_SUCCESS, TOAST_ERROR } from '../../utils/actions';
import { requestAPI } from '../../config/index';
import * as Utils from '../../utils/utils';
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

const Delete = (id, displayNotify, isReFetch, setIsReFetch) => {
    requestAPI({method: 'DELETE' ,url: `${DELETE_USER}/${id}` })
        .then(({ data }) => {
            if (data && data.status === 200) {
                setIsReFetch(!isReFetch);
                displayNotify(TOAST_SUCCESS, 'Xóa user thành công !')
            } else {
                displayNotify(TOAST_ERROR, data.errorMessage || 'Xóa user thất bại !')
            }
            return;
        })
        .catch(() => displayNotify(TOAST_ERROR, 'Xóa user thất bại !'))
}

const UserComponent = ({ displayNotify }) => {
    const [dataSrc, setDataSrc] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [pageIndex, setPageIndex] = useState(PAGE_INDEX);
    const [totalPage, setTotalPage] = useState(0);
    const [isReFetch, setIsReFetch] = useState(false);

    const columns = [
        {
            title: 'No.',
            dataIndex: 'key'
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            render: avatar => <RenderColumnComponent type="avatar" content={avatar} />
        },
        {
            title: "User's name",
            dataIndex: 'name',
            render: name => <RenderColumnComponent content={name} />
        },
        {
            title: 'Sex',
            dataIndex: 'gioi_tinh',
            render: sex => <RenderColumnComponent type="sex" content={sex} />
            // width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: email => <RenderColumnComponent content={email} />
        },
        {
            title: 'Address',
            dataIndex: 'address',
            render: address => <RenderColumnComponent content={address} />
        },
        {
            title: 'Date created',
            dataIndex: 'created',
            render: created => <RenderColumnComponent type="date" content={created} />
        },
        {
            title: 'Edit',
            dataIndex: 'id',
            render: (id, row, index) => {
                return (
                    <Fragment>
                        <Link href={"/user/detail?id=" + id} >
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
        const opt = {
            method: 'GET' ,
            url: `${GET_USERS}?page_num=${pageIndex}&page_row=${pageSize}`
        }
        const fetchData = async () => {
            try {
                const rs = await requestAPI(opt);
                const { result, count } = rs.data.data;
                Utils.mapIndex(result, (pageIndex - 1) * pageSize)
                setDataSrc(result);
                setTotalPage(count)
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false);

        }
        !didCancel && fetchData()
        return () => {
            didCancel = true;
        };
    }, [pageIndex, isReFetch, pageSize])
    const getPage = (pageIndex, pageSize) => {
        setPageIndex(pageIndex);
    }
    return (
        <Fragment>
            <HeaderContent 
                isPageSize={true}
                getPageSize={setPageSize}
                title="List of users" />
            <div className="padding-table">
                <TableComponent
                    columns={columns}
                    isLoading={isLoading}
                    data={dataSrc}
                    rowKey={record => record.key} 
                    pageSize={pageSize}
                    onChangePage={getPage}
                    totalPage={totalPage}/>
            </div>
        </Fragment>
    )
}
export default connectToRedux(UserComponent);