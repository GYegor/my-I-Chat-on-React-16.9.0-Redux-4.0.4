/* eslint-disable react/prop-types */
import React from 'react';

const ConnectionStatus = ({ connectionReadyState }) => (
  <div className="connection-status">
    {connectionReadyState}
  </div>
);

export default ConnectionStatus;
