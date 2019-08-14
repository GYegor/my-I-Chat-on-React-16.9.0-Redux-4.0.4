/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { OPENED } from '../constants/connection-status';

class SendMessage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  inputToState(text) {
    this.setState({
      value: text,
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
    this.inputToState('');
  }

  render() {
    const { userName } = this.props;
    const { value } = this.state;
    const inputActive = (
      <input className="input-massage active" type="text" placeholder="Write you message" value={value} onChange={(e) => this.inputToState(e.target.value)} />
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
