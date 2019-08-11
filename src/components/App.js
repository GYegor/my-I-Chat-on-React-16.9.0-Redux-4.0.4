import React, {Component} from 'react';
// import Websocket from 'react-websocket';
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";
import SignForm from "./SignForm";
import '../App.css';

class App extends Component {
  constructor() {
    super();
    this.cachedName = localStorage.getItem("loggedAs") ? JSON.parse(localStorage.getItem("loggedAs")) : false;
    this.state = {
      ws: new WebSocket('ws://st-chat.shas.tel'),
      userName: this.cachedName.userName,
      isUserSigned: this.cachedName.isUserSigned,
      result: [],
      inputMessage: ''
    };
  }

  getMessage = () => {
    const websocket = this.state.ws;
    websocket.onmessage = (e) => {
    const newData = JSON.parse(e.data)
      newData.reverse();
      this.setState( (prevState) => {return {result: [...prevState.result,...newData]};});
    }
  }

  sendMessage = (message) => {
    let websocket = this.state.ws;
    const messageObject = {
      from: this.state.userName,
      message: message
    }
    websocket.send(JSON.stringify(messageObject));
    console.log(JSON.stringify(messageObject));
  }

  componentDidMount() {
    this.getMessage();
  }


  componentDidUpdate() {
    // this.onMessage();
    window.scrollTo(0, document.body.scrollHeight);
  }


  handleNickname = (text = '') => {
    let nameData = JSON.stringify({
      userName: text,
      isUserSigned: text.length > 0? true : false,
    });
    localStorage.setItem("loggedAs", nameData);
    this.setState({
      userName: text,
      isUserSigned: text.length > 0? true : false,
    });
  }
  

  render() {
    console.log(this.state.isUserSigned);
    return (
    <div className="main">
      <SignForm handleNickname={this.handleNickname} isUserSigned={this.state.isUserSigned} userName={this.state.userName}/>
      <MessageList messageArr={this.state.result}  />
      <SendMessage handleSubmit={this.sendMessage} isUserSigned={this.state.isUserSigned} />
    </div>
    );
  }
}

export default App;
