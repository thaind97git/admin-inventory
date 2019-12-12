import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import ProductComponent from '../../components/product/ProductComponent'
const StudentLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <ProductComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(StudentLayout)