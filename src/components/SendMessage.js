import React, { Component } from 'react';

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
    const { sendMessage, connectionStatus, cacheMessage } = this.props;
    const message = this.state.value;
    e.preventDefault();
    connectionStatus === 1 ? sendMessage(message) : cacheMessage(message);
    this.inputToState('');
  }

  render() {
    const { isUserSigned } = this.props;
    const inputActive = (
      <input className="input-massage active" type="text" placeholder="Write you message" value={this.state.value} onChange={e => this.inputToState(e.target.value)} />
    )
    const inputInactive = (
      <div className="input-massage inctive"></div>
    )

    return (
      <form className="message-form" onSubmit={this.handleMessage}>
        {isUserSigned ? inputActive : inputInactive}
      </form>
    );
  }
}

export default SendMessage;
