import React from 'react';

const Panel = ({ children }) => (
  <div className={'w-100 h-100 d-flex flex-column justify-content-evenly align-items-center'}>
    {children}
  </div>
);

export default Panel;
