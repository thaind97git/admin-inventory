import React from 'react';
import authenHOC from '../../HOC/authenHOC';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import UnitsComponent from '../../components/unit/UnitsComponent';

const MethodRegisterLayout = ({ }) => (
    <AdminPageLayout>
        <UnitsComponent />
    </AdminPageLayout>
)

export default authenHOC(MethodRegisterLayout)