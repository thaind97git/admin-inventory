import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import UserDetailComponent from '../../components/user/UserDetailComponent';

const UserDetailLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <UserDetailComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(UserDetailLayout)