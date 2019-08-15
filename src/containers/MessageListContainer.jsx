/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ReconnectingWebSocket from 'reconnecting-websocket';
import {
  onConnectionOpened as onConnectionOpenedAction,
  onConnectionClosed as onConnectionClosedAction,
  onMessage as onMessageAction,
} from '../actions/chat-actions';
import MessageList from '../components/MessageList';

const mapStateToProps = ({ connection, messages, messageIds }) => (
  {
    connection,
    messages,
    messageIds,
  }
);

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

class MessageListContainerUI extends Component {
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
    const { messages } = this.props;
    return (
      <MessageList messages={messages} />
    );
  }
}


const MessageListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageListContainerUI);

export default MessageListContainer;
