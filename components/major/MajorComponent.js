import React, { Fragment, useState, useEffect } from 'react';
import { Pagination, Row, Col, Input, Form, Checkbox, Icon, Tag } from 'antd';
import { pick } from 'lodash/fp';
import { connect } from 'react-redux';
import { PAGE_SIZE, PAGE_INDEX } from '../../constant/constants';
import { DELETE_MAJOR, GET_MAJOR, UPDATE_MAJOR } from '../../constant/UrlApi';
import { TOAST_SUCCESS, TOAST_ERROR } from '../../utils/actions';
import { requestAPI } from '../../config/index';
import * as Utils from '../../utils/utils';
import Link from 'next/link';


import TableComponent from '../TableComponent';

import ButtonLayout from '../../layouts/ButtonLayout';
import ConfirmLayout from '../../layouts/ConfirmLayout';
import HeaderContent from '../HeaderContent';
import RenderColumnComponent from '../RenderComlunComponent';
const connectToRedux = connect(
    pick(['isLoading']),
    dispatch => ({
        displayDialog: (type, title = "", content = "") => {
            dispatch({ type: type, payload: { title: title, content: content } })
        },
        displayNotify: (type, message) => {
            dispatch({ type: type, payload: { message: message } })
        },
    })
)

const Delete = (id, displayNotify, isReFetch, setIsReFetch) => {
    requestAPI({method: 'DELETE' ,url: `${DELETE_MAJOR}/${id}` })
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

const MajorComponent = ({ displayNotify }) => {
    const [dataSrc, setDataSrc] = useState([]);
    const [pageIndex, setPageIndex] = useState(PAGE_INDEX);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [totalPage, setTotalPage] = useState(0);
    const [isReFetch, setIsReFetch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const columns = [
        {
            title: 'No.',
            dataIndex: 'key'
        },
        {
            title: 'Major name',
            dataIndex: 'name',
            render: name => <RenderColumnComponent content={name} />
        },
        {
            title: 'Major code',
            dataIndex: 'ma_nganh',
            render: code => <RenderColumnComponent content={code} />
            // width: '20%',
        },
        {
            title: 'Major group',
            dataIndex: 'nhom_nganh',
            render: group => <RenderColumnComponent content={group} />
        },
        {
            title: 'Subject combination',
            dataIndex: 'to_hop_mon',
            render: tags => (
                <span>
                  {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </span>
              )
        },
        {
            title: 'Date create',
            dataIndex: 'created',
            render: created => <RenderColumnComponent type="date" content={created} />
        },
        {
            title: 'Edit',
            dataIndex: 'id',
            render: (id, row, index) => {
                return (
                    <Fragment>
                        <Link href={"/major/detail?id=" + id} >
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
        setIsLoading(true);
        const opt = {
            method: 'GET' ,
            url: `${GET_MAJOR}?page_num=${pageIndex}&page_row=${pageSize}` 
        }
        const fetchData = async () => {
            try {
                const rs = await requestAPI(opt);
                setIsLoading(false);
                const { result, count } = rs.data.data;
                Utils.mapIndex(result, (pageIndex - 1) * pageSize)
                setDataSrc(result);
                setTotalPage(count)
            } catch (error) {
                console.log(error)
            }

        }
        fetchData()
    }, [pageIndex, isReFetch, pageSize])
    const getPage = (pageIndex, pageSize) => {
        setPageIndex(pageIndex);
    }
    return (
        <Fragment>
            <HeaderContent 
                title="List of majors" 
                isPageSize={true}
                getPageSize={setPageSize}/>
            <div className="padding-table">
                <TableComponent
                    columns={columns}
                    isLoading={isLoading}
                    data={dataSrc}
                    rowKey={record => record.key} 
                    pageSize={pageSize}
                    onChangePage={getPage}
                    totalPage={totalPage} />
            </div>
        </Fragment>
    )
}
const WrappedMajor = Form.create()(MajorComponent)
export default connectToRedux(WrappedMajor);