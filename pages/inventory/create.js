import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import CreateExamComponent from '../../components/inventory/CreateExamComponent';

const CreateExamLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <CreateExamComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(CreateExamLayout)