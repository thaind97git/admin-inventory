import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import ExamDetailComponent from '../../components/exam/ExamDetailComponent';

const ExamDetailLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <ExamDetailComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(ExamDetailLayout)