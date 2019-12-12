import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import InventoryDetailsComponent from '../../components/inventory/InventoryDetailsComponent';

const ExamDetailLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <InventoryDetailsComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(ExamDetailLayout)