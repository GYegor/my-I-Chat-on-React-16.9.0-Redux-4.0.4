/* eslint-disable react/prop-types */
import React from 'react';
import Message from './Message';

function MessageList({ messages }) {
  let list;

  if (messages) {
    list = messages
      .map((item) => (<Message key={item.id} message={item} />));
  }

  return (
    <ul className="message-list">
      {list}
    </ul>
  );
}

export default MessageList;
