import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import CreateEmployeeComponent from '../../components/employee/CreateEmployeeComponent';

const CreateUserLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <CreateEmployeeComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(CreateUserLayout)