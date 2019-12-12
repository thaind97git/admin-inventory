import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
// import MajorDetailComponent from '../../components/major/MajorDetailComponent';

const MajorDetailLayout = (rootProps) => {
    return (
        <AdminPageLayout>
            {/* <MajorDetailComponent /> */}
        </AdminPageLayout>
    )
}

export default AuthenHOC(MajorDetailLayout)