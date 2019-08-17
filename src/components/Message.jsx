/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import customDateString from '../utils/customDateString';


class Message extends PureComponent {
  render() {
    const { message } = this.props;
    return (
      <li>
        <span className="name">{`${message.from}:   `}</span>
        <span className="time">{customDateString(message.time)}</span>
        <p className="message-body">{message.message}</p>
      </li>
    );
  }
}
export default Message;
