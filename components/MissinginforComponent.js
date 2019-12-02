import React from 'react';
const MissinginforComponent = ({ children }) => (
  <div className="cover container d-flex justify-content-center align-items-center">
    <h1 className="sorry position-absolute">Sorry</h1>
      <div className="children-missing">
        <div>{children}</div>
      </div>
    <style jsx>{`
      .cover {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center
      }
      .sorry {
        opacity: 0.05;
        font-size: 108px;
        position: absolute
      }
      .children-missing {
        background-color: rgba(255, 255, 255, 0.6);
        padding: 48px;
        border: 0;
        box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);
        color: #f56b6b;
        font-size: 3rem
      }
    `}</style>
  </div>
);

export default MissinginforComponent;
