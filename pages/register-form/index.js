import React from 'react';
import authenHOC from '../../HOC/authenHOC';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import FormRegisterComponent from '../../components/FormRegisterComponent';

const FormRegisterLayout = ({}) => (
    <AdminPageLayout>
        <FormRegisterComponent />
    </AdminPageLayout>
)

export default authenHOC(FormRegisterLayout)