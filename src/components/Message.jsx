/* eslint-disable react/prop-types */
import React from 'react';
import customDateString from '../utils/customDateString';


function Message({ message }) {
  return (
    <li>
      <span className="name">{`${message.from}:   `}</span>
      <span className="time">{customDateString(message.time)}</span>
      <p className="message-body">{message.message}</p>
    </li>
  );
}

export default Message;
