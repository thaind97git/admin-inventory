import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import StudentComponent from '../../components/student/StudentComponent'
const StudentLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <StudentComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(StudentLayout)