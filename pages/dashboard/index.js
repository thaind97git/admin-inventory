import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import DashboardComponent from '../../components/DashboardComponent';
const DashboardPage = (rootProps) => {
    return (
        <AdminPageLayout>
            <DashboardComponent />
        </AdminPageLayout>
    )
}

export default (DashboardPage)