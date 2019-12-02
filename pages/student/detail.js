import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import StudentDetailComponent from '../../components/student/StudentDetailComponent';

const StudentDetailLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <StudentDetailComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(StudentDetailLayout)