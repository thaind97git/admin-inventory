import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import BillsComponent from '../../components/BillsComponent'
const SchoolLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <BillsComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(SchoolLayout)