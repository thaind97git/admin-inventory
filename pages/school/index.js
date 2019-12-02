import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import SchoolComponent from '../../components/SchoolComponent'
const SchoolLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <SchoolComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(SchoolLayout)