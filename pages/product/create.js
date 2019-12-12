import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import CreateProductComponent from '../../components/product/CreateProductComponent';

const CreateStudentLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <CreateProductComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(CreateStudentLayout)