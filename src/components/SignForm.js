import React, { Component } from 'react';

class SignForm extends Component {
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

  submitNickname = (e) => {
    const { handleNickname } = this.props;
    const message = this.state.value;
    e.preventDefault();
    handleNickname(message);
    this.inputToState('');
  }

  render() {
  const { userName, isUserSigned } = this.props
  const userSigned = (
    <>
      <p><b>You signed as:</b></p>
      <p>{userName}</p>
      <input type="submit" value="Sign out"/>
    </>
  );
  
  const userNotSigned = (
    <>
      <p><b>Enter your nickname </b></p>
      <input type="text" value={this.state.value} onChange={e => this.inputToState(e.target.value)}/>
      <input type="submit" value="Sign in"/>
    </>
  );

  return (
      <form className="sign-form" onSubmit={this.submitNickname}>
        {isUserSigned ? userSigned : userNotSigned}
      </form>
    );
  }
}

export default SignForm;
