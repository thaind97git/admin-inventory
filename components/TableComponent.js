import { Table, Pagination } from 'antd';
import { Fragment } from 'react';

const Tablecomponent = ({
    columns,
    data,
    handleTableChange,
    isLoading,
    pagination,
    rowKey,
    scrollX = '',
    scrollY = '',
    pageSize,
    onChangePage,
    defaultCurrent = 1,
    totalPage
}) => {
    return (
        <Fragment>
            <Table
                style={{ overflowX: 'auto' }}
                columns={columns}
                rowKey={rowKey}
                dataSource={data}
                pagination={pagination || false}
                loading={isLoading}
                onChange={handleTableChange}
                scroll={{ x: scrollX, y: scrollY }}
            />
            <br/>
            <Pagination
                pageSize={pageSize}
                onChange={onChangePage}
                defaultCurrent={defaultCurrent}
                total={totalPage} />
        </Fragment>
    )
}
export default Tablecomponent;