/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { OPENED } from '../constants/connection-status';

class SendMessage extends PureComponent {
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
    const { sendMessage, connectionReadyState, cacheMessage } = this.props;
    const { message } = this.state;
    e.preventDefault();
    if (connectionReadyState === OPENED) {
      sendMessage(message);
    } else {
      cacheMessage(message);
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

export default SendMessage;
