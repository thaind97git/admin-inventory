import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import EmployeeDetailsComponent from '../../components/employee/EmployeeDetailsComponent';

const UserDetailLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <EmployeeDetailsComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(UserDetailLayout)