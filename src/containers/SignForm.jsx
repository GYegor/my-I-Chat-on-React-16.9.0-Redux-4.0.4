/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class SignForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameGetted: '',
    };
    this.getName = this.getName.bind(this);
    this.submitNickname = this.submitNickname.bind(this);
  }

  getName(text) {
    this.setState({
      nameGetted: text,
    });
  }

  submitNickname(event) {
    const { handleNickname } = this.props;
    const { nameGetted } = this.state;
    event.preventDefault();
    handleNickname(nameGetted);
    this.getName('');
  }

  render() {
    const { userName } = this.props;
    const { nameGetted } = this.state;
    const userSigned = (
      <>
        <p><b>You signed as:</b></p>
        <p>{userName}</p>
        <input type="submit" value="Sign out" />
      </>
    );

    const userNotSigned = (
      <>
        <p><b>Enter your nickname </b></p>
        <input type="text" value={nameGetted} onChange={(e) => this.getName(e.target.value)} />
        <input type="submit" value="Sign in" />
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