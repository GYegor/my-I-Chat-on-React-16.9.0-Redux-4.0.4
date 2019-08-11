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

  sendMessage = (e) => {
    const { handleSubmit, connectionStatus, cacheMessage } = this.props;
    const message = this.state.value;
    e.preventDefault();
    console.log(connectionStatus);
    connectionStatus === 1 ? handleSubmit(message) : cacheMessage(message);
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
      <form className="message-form" onSubmit={this.sendMessage}>
        {isUserSigned ? inputActive : inputInactive}
      </form>
    );
  }
}

export default SendMessage;
