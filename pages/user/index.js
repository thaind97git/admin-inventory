import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import UserComponent from '../../components/user/UserComponent';
const UserLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <UserComponent />
        </AdminPageLayout>
    )
}

export default (UserLayout)