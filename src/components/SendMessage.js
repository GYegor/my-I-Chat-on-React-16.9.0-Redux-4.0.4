import React, { Component } from 'react';
import { OPENED } from '../constants/connection-status';

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  inputToState = (text) => {
    this.setState({
      value: text,
    });
  }

  handleMessage = (e) => {
    const { sendMessage, connectionReadyState, cacheMessage } = this.props;
    const message = this.state.value;
    e.preventDefault();
    connectionReadyState === OPENED
      ? sendMessage(message)
      : cacheMessage(message);
    this.inputToState('');
  }

  render() {
    const { userName } = this.props;
    const inputActive = (
      <input className="input-massage active" type="text" placeholder="Write you message" value={this.state.value} onChange={e => this.inputToState(e.target.value)} />
    )
    const inputInactive = (
      <div className="input-massage inctive"></div>
    )

    return (
      <form className="message-form" onSubmit={this.handleMessage}>
        {userName ? inputActive : inputInactive}
      </form>
    );
  }
}

export default SendMessage;
