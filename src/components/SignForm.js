import React, { Component } from 'react';

class SignForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameGetted: ''
    };
  }

  getName = (text) => {
    this.setState({
      nameGetted: text,
    });
  }

  submitNickname = (e) => {
    const { handleNickname } = this.props;
    const { nameGetted } = this.state
    e.preventDefault();
    handleNickname(nameGetted);
    this.getName('');
  }

  render() {
  const { userName } = this.props
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
      <input type="text" value={this.state.value} onChange={e => this.getName(e.target.value)}/>
      <input type="submit" value="Sign in"/>
    </>
  );

  return (
      <form className="sign-form" onSubmit={this.submitNickname}>
        {userName ? userSigned : userNotSigned}
      </form>
    );
  }
}

export default SignForm;
