import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import CreateSchoolComponent from '../../components/CreateSchoolComponent';

const CreateSchoolLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <CreateSchoolComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(CreateSchoolLayout)