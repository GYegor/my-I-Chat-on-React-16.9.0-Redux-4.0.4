import React, { Component } from 'react';
import Message from './Message';

class MessageList extends Component {
    render() {
    let list;
    const { messages } = this.props;

    if (messages) {
      list = messages.map(item => (<Message key={item.id} message={item}/>));
    }

    return (
      <ul className='message-list'>
        {list}
      </ul>
    )
  }
}

export default MessageList;
