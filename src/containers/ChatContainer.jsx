/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  onConnectionOpened as onConnectionOpenedAction,
  onConnectionClosed as onConnectionClosedAction,
  onMessage as onMessageAction,
} from '../actions/chat-actions';
import { OPENED } from '../constants/connection-status';

import MessageList from '../components/MessageList';
import ConnectionStatus from '../components/ConnectionStatus';

const mapStateToProps = ({
  connection,
  connectionReadyState,
  messages,
  messageIds,
  userName,
}) => ({
  connection,
  connectionReadyState,
  messages,
  messageIds,
  userName,
});

const mapDispatchToProps = (dispatch) => (
  {
    onConnectionOpened:
    (connection) => dispatch(onConnectionOpenedAction(connection)),
    onConnectionClosed:
    (reconnectHandler) => dispatch(onConnectionClosedAction(reconnectHandler)),
    onMessage:
    (newData, Ids, isWindowInactive) => dispatch(onMessageAction(newData,
      Ids, isWindowInactive)),
  }
);

class ChatContainerUI extends Component {
  constructor(props) {
    super(props);
    const {
      connection,
      messageIds,
      isWindowInactive,
      onConnectionOpened,
      onConnectionClosed,
      onMessage,
    } = this.props;

    this.connection = connection;
    this.messageIds = messageIds;
    this.isWindowInactive = isWindowInactive;
    this.onConnectionOpened = onConnectionOpened.bind(this);
    this.onMessage = onMessage.bind(this);
    this.onConnectionClosed = onConnectionClosed.bind(this);
  }

  componentDidMount() {
    let isWindowInactive = false;
    window.onfocus = () => { isWindowInactive = false; };
    window.onblur = () => { isWindowInactive = true; };

    const {
      connection,
      messageIds,
      onConnectionOpened,
      onConnectionClosed,
      onMessage,
    } = this;
    Notification.requestPermission();
    connection.addEventListener('open', () => onConnectionOpened(connection));
    connection.addEventListener('close', () => onConnectionClosed(onConnectionOpened));
    connection.addEventListener('message', (event) => onMessage(event.data, messageIds, isWindowInactive));
  }

  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    const { messages, connectionReadyState, userName } = this.props;
    let isConnected;

    if (connectionReadyState === OPENED) {
      isConnected = 'connected';
    } else {
      isConnected = 'connecting';
    }

    return (
      <>
        <ConnectionStatus connectionReadyState={connectionReadyState} className={isConnected} />
        <MessageList messages={messages} userName={userName} />
      </>
    );
  }
}

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatContainerUI);

export default ChatContainer;
