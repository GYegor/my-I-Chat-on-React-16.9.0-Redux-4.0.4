import React, { Component } from 'react';

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  inputToState = (text) => {
    this.setState({
      value: text,
    });
  }

  sendMessage = (e) => {
    const { handleSubmit } = this.props;
    const message = this.state.value
    e.preventDefault();
    handleSubmit(message);
    this.inputToState('');
  }

  render() {
    return (
      <form onSubmit={this.sendMessage}>
          <input type="text" placeholder="Введите сообщение" value={this.state.value} onChange={e => this.inputToState(e.target.value)} />
        {/* <input type="submit" value="Отправить" /> */}
      </form>
    );
  }
}

export default SendMessage;
