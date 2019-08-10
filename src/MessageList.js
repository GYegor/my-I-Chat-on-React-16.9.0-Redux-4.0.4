import React, { PureComponent } from 'react';
import uniqid from 'uniqid';
import Message from './Message';

class MessageList extends PureComponent {
    render() {
    let list;
    const { data } = this.props;
    if (data) {
      list = data.map(message => (<Message key={uniqid()} message={message}/>));
    }
    return (
      <ul className='message-list'>
      {list}
    </ul>
    )
  }
}

export default MessageList;
