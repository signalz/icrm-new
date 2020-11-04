import React from 'react';

export default ({ header, children }) => (
  <div className="content-wrapper">
    <h1 className="content-header">{header}</h1>
    <div className="content">{children}</div>
  </div>
);
