import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import InventoriesComponent from '../../components/inventory/InventoriesComponent';

const ExamLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <InventoriesComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(ExamLayout)