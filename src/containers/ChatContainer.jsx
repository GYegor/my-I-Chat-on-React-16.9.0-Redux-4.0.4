/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  onConnectionOpened as onConnectionOpenedAction,
  onConnectionClosed as onConnectionClosedAction,
  onMessage as onMessageAction,
} from '../actions/chat-actions';

import MessageList from '../components/MessageList';
import ConnectionStatus from '../components/ConnectionStatus';


const mapStateToProps = ({
  connection,
  connectionReadyState,
  messages,
  messageIds,
}) => ({
  connection,
  connectionReadyState,
  messages,
  messageIds,
});

const mapDispatchToProps = (dispatch) => (
  {
    onConnectionOpened:
    (connection) => dispatch(onConnectionOpenedAction(connection)),
    onConnectionClosed:
    (reconnectHandler) => dispatch(onConnectionClosedAction(reconnectHandler)),
    onMessage:
    (newData, messageIds) => dispatch(onMessageAction(newData, messageIds)),
  }
);

class ChatContainerUI extends Component {
  componentDidMount() {
    const {
      connection,
      messageIds,
      onConnectionOpened,
      onConnectionClosed,
      onMessage,
    } = this.props;

    connection.addEventListener('open', () => onConnectionOpened(connection));
    connection.addEventListener('close', () => onConnectionClosed(onConnectionOpened));
    connection.addEventListener('message', (event) => onMessage(event.data, messageIds));
  }

  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    const { messages, connectionReadyState } = this.props;
    return (
      <>
        <ConnectionStatus connectionReadyState={connectionReadyState} />
        <MessageList messages={messages} />
      </>
    );
  }
}


const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatContainerUI);

export default ChatContainer;
