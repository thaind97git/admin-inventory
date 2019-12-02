import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import TableComponent from '../../components/TableComponent';
const columns = [
    {
        title: 'No.',
        dataIndex: 'id',
        
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      render: name => `${name.first} ${name.last}`,
      width: '20%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

const data = [
    {
        id: 1,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Male',
        email: 'thaind97.dev@gmail.com'
    },
    {
        id: 2,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Female',
        email: 'thaind97.dev@gmail.com'
    },
    {
        id: 3,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Female',
        email: 'thaind97.dev@gmail.com'
    },
    {
        id: 4,
        name: {
            first: 'judo',
            last: 'nguyen'
        },
        gender: 'Male',
        email: 'thaind97.dev@gmail.com'
    }
]
const DashboardPage = (rootProps) => {
    return (
        <AdminPageLayout>
            Admin Component
            <TableComponent columns={columns} isLoading={false} data={data} rowKey={record => record.id}  />
        </AdminPageLayout>
    )
}

export default AuthenHOC(DashboardPage)