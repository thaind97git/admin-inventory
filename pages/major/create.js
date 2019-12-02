import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import CreateMajorComponent from '../../components/major/CreateMajorComponent';

const CreateMajorLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <CreateMajorComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(CreateMajorLayout)