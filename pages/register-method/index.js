import React from 'react';
import authenHOC from '../../HOC/authenHOC';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import MethodRegisterComponent from '../../components/MethodRegisterComponent';

const MethodRegisterLayout = ({}) => (
    <AdminPageLayout>
        <MethodRegisterComponent />
    </AdminPageLayout>
)

export default authenHOC(MethodRegisterLayout)