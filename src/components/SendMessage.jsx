/* eslint-disable react/prop-types */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OPENED } from '../constants/connection-status';

import {
  sendMessage as sendMessageAction,
  cacheMessage as cacheMessageAction,
} from '../actions/chat-actions';

const mapStateToProps = ({ userName, connectionReadyState, connection }) => (
  {
    userName,
    connectionReadyState,
    connection,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    sendMessage:
    (message, connection, userName) => dispatch(sendMessageAction(message, connection, userName)),
    cacheMessage:
    (message, userName) => dispatch(cacheMessageAction(message, userName)),
  }
);


class SendMessageUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.getMessage = this.getMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  getMessage(text) {
    this.setState({
      message: text,
    });
  }

  handleMessage(e) {
    const {
      sendMessage,
      cacheMessage,
      connection,
      connectionReadyState,
      userName,
    } = this.props;

    const { message } = this.state;
    e.preventDefault();
    if (connectionReadyState === OPENED) {
      sendMessage(message, connection, userName);
    } else {
      cacheMessage(message, userName);
    }
    this.getMessage('');
  }

  render() {
    const { userName } = this.props;
    const { message } = this.state;
    const inputActive = (
      <input className="input-massage active" type="text" placeholder="Write you message" value={message} onChange={(e) => this.getMessage(e.target.value)} />
    );
    const inputInactive = (
      <div className="input-massage inctive" />
    );

    return (
      <form className="message-form" onSubmit={this.handleMessage}>
        {userName
          ? inputActive
          : inputInactive}
      </form>
    );
  }
}

const SendMessage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendMessageUI);

export default SendMessage;
