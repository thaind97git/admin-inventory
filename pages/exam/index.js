import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import ExamComponent from '../../components/exam/ExamComponent';

const ExamLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <ExamComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(ExamLayout)