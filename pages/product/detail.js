import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import ProductDetailsComponent from '../../components/product/ProductDetailsComponent';

const StudentDetailLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <ProductDetailsComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(StudentDetailLayout)