/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  onConnectionOpened as onConnectionOpenedAction,
  onConnectionClosed as onConnectionClosedAction,
  onMessage as onMessageAction,
} from '../actions/chat-actions';
import MessageList from '../components/MessageList';

const mapStateToProps = ({ connection, messages }) => (
  {
    connection,
    messages,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onConnectionOpened:
    (connection, handleClosing) => dispatch(onConnectionOpenedAction(connection, handleClosing)),
    onConnectionClosed:
    (handleOpening) => dispatch(onConnectionClosedAction(handleOpening)),
    onMessage:
    ({ data }) => dispatch(onMessageAction({ data })),
  }
);

class MessageListContainerUI extends Component {
  constructor(props) {
    super(props);
    this.onConnectionOpened = this.props.onConnectionOpened.bind(this);
    this.onConnectionClosed = this.props.onConnectionClosed.bind(this);
    this.onMessage = this.props.onMessage.bind(this);
  }

  componentDidMount() {
    const {
      connection,
    } = this.props;

    const {
      onConnectionOpened,
      onConnectionClosed,
      onMessage,
    } = this;

    connection.addEventListener('open', () => onConnectionOpened(connection, onConnectionClosed));
    connection.addEventListener('close', () => onConnectionClosed(onConnectionOpened));
    connection.addEventListener('message', onMessage);
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
