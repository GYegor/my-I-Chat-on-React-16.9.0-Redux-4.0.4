/* eslint-disable react/prop-types */
import React from 'react';

const ConnectionStatus = ({ connectionReadyState, className }) => (
  <div className={`connection-status ${className}`}>
    <b>{connectionReadyState}</b>
  </div>
);

export default ConnectionStatus;
