/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import customDateString from '../utils/customDateString';


class Message extends PureComponent {
  render() {
    const { message, userName } = this.props;
    let isUser;
    if (userName && message.from.indexOf(`${userName}`) !== -1) {
      isUser = ' is-user';
    } else {
      isUser = '';
    }

    return (
      <li className={`list-item${isUser}`}>
        <span className="name">{`${message.from}:   `}</span>
        <span className="time">{customDateString(message.time)}</span>
        <p className="message-body">{message.message}</p>
      </li>
    );
  }
}
export default Message;
