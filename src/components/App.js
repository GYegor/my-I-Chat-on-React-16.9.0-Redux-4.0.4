import React, {Component} from 'react';
// import Websocket from 'react-websocket';
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";
import SignForm from "./SignForm";
import customDateString from "../utils/customDateString"


import ConnectionStatus from "./ConnectionStatus";

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
      connectionStatus: 3,
    };
  }

  componentDidMount() {
    this.updateConnectionStatus()
    this.getMessage();
  }

  componentDidUpdate() {
    this.updateConnectionStatus()
    window.scrollTo(0, document.body.scrollHeight);
  }

  getMessage = () => {
    const websocket = this.state.ws;
    websocket.onmessage = (e) => {
      const newData = JSON.parse(e.data)
      newData.reverse();
      this.setState( (prevState) => {return {result: [...prevState.result,...newData]};});
    }
  }

  updateConnectionStatus = () => {
    const websocket = this.state.ws;
    websocket.onopen = () => {
      this.setState({
        connectionStatus: websocket.readyState,
      });
      if (localStorage.getItem("offlineMessages")) {
        const offlineArr = JSON.parse(localStorage.getItem("offlineMessages"));
        offlineArr.forEach( message => {websocket.send(JSON.stringify(message));})
        localStorage.removeItem("offlineMessages");
      }
    }
    websocket.onclose = () => {
      this.setState({
        connectionStatus: websocket.readyState,
      });
    }
    // check();
  };


  handleSubmit = (message) => {
    let websocket = this.state.ws;
    const messageObject = {
      from: this.state.userName,
      message: message
    }
    websocket.send(JSON.stringify(messageObject));
  }

  cacheMessage = (message) => {
    if (!localStorage.getItem("offlineMessages")) {
      localStorage.setItem("offlineMessages", JSON.stringify([]));
    }
    let millisecs = (new Date()).getTime();
    let cachedDate = customDateString(millisecs);
    let missedMessage = {
      from: `${this.state.userName} (missed ${cachedDate})`,
      message: message
    }
    let cachedMessageArr = JSON.parse(localStorage.getItem("offlineMessages"));
    console.log(cachedMessageArr);
    cachedMessageArr.push(missedMessage);
    localStorage.setItem("offlineMessages", JSON.stringify(cachedMessageArr));
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
    return (
    <div className="main">
      {/* <ConnectionStatus connectionStatus={this.state.connectionStatus}/> */}
      <SignForm handleNickname={this.handleNickname} isUserSigned={this.state.isUserSigned} userName={this.state.userName}/>
      <MessageList messageArr={this.state.result}  />
      <SendMessage connectionStatus={this.state.connectionStatus} handleSubmit={this.handleSubmit} cacheMessage={this.cacheMessage} isUserSigned={this.state.isUserSigned} />
    </div>
    );
  }
}

export default App;
