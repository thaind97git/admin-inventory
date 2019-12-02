import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import CreateStudentComponent from '../../components/student/CreateStudentComponent';

const CreateStudentLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <CreateStudentComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(CreateStudentLayout)