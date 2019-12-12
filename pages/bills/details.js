import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import BillDetailsComponent from '../../components/BillDetailsComponent';

const CreateSchoolLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            <BillDetailsComponent />
        </AdminPageLayout>
    )
}

export default AuthenHOC(CreateSchoolLayout)