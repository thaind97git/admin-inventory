import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import MethodDetailComponent from '../../components/MethodDetailComponent';

const MethodDetailLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <MethodDetailComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(MethodDetailLayout)