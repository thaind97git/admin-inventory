import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import CreateUserComponent from '../../components/user/CreateUserComponent';

const CreateUserLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <CreateUserComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(CreateUserLayout)