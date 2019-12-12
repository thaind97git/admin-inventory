import React from 'react';
import AdminPageLayout from '../../layouts/AdminPageLayout';
import AuthenHOC from '../../HOC/authenHOC';
import EmployeesComponent from '../../components/employee/EmployeesComponent';
const UserLayout = (rootProps) => {
  return (
    <AdminPageLayout>
      <EmployeesComponent />
    </AdminPageLayout>
  )
}

export default AuthenHOC(UserLayout)