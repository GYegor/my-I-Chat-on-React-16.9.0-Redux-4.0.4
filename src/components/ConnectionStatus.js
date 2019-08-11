import React from 'react';

const ConnectionStatus = ({ connectionStatus }) => {
  console.log(connectionStatus);
  return (
    <div>
      {connectionStatus}
    </div>
  )
}

export default ConnectionStatus;
