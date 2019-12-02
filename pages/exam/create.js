import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import CreateExamComponent from '../../components/exam/CreateExamComponent';

const CreateExamLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <CreateExamComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(CreateExamLayout)