import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import { Pagination, Icon } from 'antd';
import { requestAPI } from '../config';
import { GET_METHOD_REGISTER } from '../constant/UrlApi';
import { PAGE_SIZE, PAGE_INDEX } from '../constant/constants';
import { DIALOG_ERROR, DIALOG_INFO, DIALOG_WARN, DIALOG_SUCCESS } from '../utils/actions';
import Link from 'next/link';

import * as Utils from '../utils/utils';
import HeaderContent from './HeaderContent';
import Tablecomponent from './TableComponent';
import ButtonLayout from '../layouts/ButtonLayout';
import RenderColumnComponent from './RenderComlunComponent';

const connectToRedux = connect(
    pick(['']),
    dispatch => ({
        displayNotify: (type, message) => {
            dispatch({ type: type, payload: { message: message, options: {} } })
        },
        displayDialog: (type, title, content, onOK) => {
            dispatch({ type: type, payload: { title, content, onOK } })
        }
    })
)

const MethodRegisterComponent = ({ displayDialog }) => {
    const [dataSrc, setDataSrc] = useState([]);
    const [pageIndex, setPageIndex] = useState(PAGE_INDEX);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [isReFetch, setIsReFetch] = useState(false);
    const columns = [
        {
            title: 'No.',
            dataIndex: 'key'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: name => <RenderColumnComponent content={name} />
        },
        {
            title: 'Method type',
            dataIndex: 'id_register_method_type',
            render: type => <RenderColumnComponent type='method' content={type} />
            // width: '20%',
        },
        {
            title: 'Date create',
            dataIndex: 'created',
            render: created => <RenderColumnComponent type="date" content={created} />
        },
        {
            title: 'Edit',
            dataIndex: '',
            render: (_, row, index) => {
                return (
                    <Fragment>
                        <Link href={"/register-method/detail?id=" + row.id} >
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
        const opt = {
            method: 'GET' ,
            url: `${GET_METHOD_REGISTER}?page_num=${pageIndex}&page_row=${pageSize}` 
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
                title="List register type" />
            <div className="padding-table">
                <Tablecomponent
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

export default connectToRedux(MethodRegisterComponent)