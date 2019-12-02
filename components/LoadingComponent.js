import React from 'react';

const LoadingComponent = () => (
  <React.Fragment>
    <link
      rel="stylesheet"
      type="text/css"
      href="/static/access/rainbowloader.css"
    />
    {/* <span className="loader" /> */}
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  </React.Fragment>
);
export default LoadingComponent;
