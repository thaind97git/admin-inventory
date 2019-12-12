import React from 'react';
import { Icon } from 'antd';
const BillTypeComponent = ({ type = 1 }) => (
  <div>
    {
      type === 1 ?
        <React.Fragment>
          <Icon type="cloud-download" viewBox="Export" /> Export
        </React.Fragment> :
        <React.Fragment>
          <Icon type="cloud-upload" viewBox="Import" /> Import
        </React.Fragment>}
  </div>
)
export default BillTypeComponent;