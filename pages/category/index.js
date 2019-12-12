import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import CategoryComponent from '../../components/category/CategoryComponent';

const MajorLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <CategoryComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(MajorLayout)