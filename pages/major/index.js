import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import MajorComponent from '../../components/major/MajorComponent';

const MajorLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <MajorComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(MajorLayout)