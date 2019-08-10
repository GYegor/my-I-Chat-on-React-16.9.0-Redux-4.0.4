import React, { PureComponent } from 'react';

class Message extends PureComponent {

  // shouldComponentUpdate(nextProps) {
  //   console.log(this.props.message.id, nextProps.message.id);
  //   return this.props.message.id !== nextProps.message.id;
  // }
  
  render() {
    const { message } = this.props;
    return (
  <li>
    <span className={'name'}>{`${message.from}:   `}</span>
    <span className={'time'}>{message.time}</span>
    <p className={'message-body'}>{message.message}</p>
  </li>
    );
  }
};

export default Message;
