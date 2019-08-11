import React, { Component } from 'react';
import Message from './Message';

class MessageList extends Component {
    render() {
    let list;
    const { messageArr } = this.props;

    if (messageArr) {
      list = messageArr.map(message => {console.log(message.id); return (<Message key={message.id} message={message}/>); });
    }

    return (
      <ul className='message-list'>
      {list}
    </ul>
    )
  }
}

export default MessageList;
