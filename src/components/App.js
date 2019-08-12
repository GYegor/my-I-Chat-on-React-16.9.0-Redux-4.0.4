import React, {Component} from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
// import Websocket from 'react-websocket';
import customDateString from "../utils/customDateString"
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";
import SignForm from "./SignForm";
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
    this.statusHandler()
  }
  
  componentDidUpdate() {
    // this.statusHandler()
    window.scrollTo(0, document.body.scrollHeight);
  }

  getMessage = () => {
    // this.setState({
    //   result: [],
    // });
    const websocket = this.state.ws;
    websocket.onmessage = (e) => {
      const newData = JSON.parse(e.data)
      newData.reverse();
      this.setState( (prevState) => {return {result: [...prevState.result,...newData]};});
    }
  }

  statusHandler = () => {
    const websocket = this.state.ws;

    const handleOpen = () => {
      this.setState({
        connectionStatus: websocket.readyState,
        result: [],
      });
      if (localStorage.getItem("offlineMessages")) {
        const offlineArr = JSON.parse(localStorage.getItem("offlineMessages"));
        offlineArr.forEach( message => {websocket.send(JSON.stringify(message));})
        localStorage.removeItem("offlineMessages");
      }
      this.getMessage();
    }
    
    
    const handleClose = () => {
      const rws = new ReconnectingWebSocket('ws://st-chat.shas.tel', [], {connectionTimeout: 5000, maxRetries: 10});
      this.setState({
        connectionStatus: websocket.readyState,
        // result: [],
      });
      // websocket.removeEventListener('open', handleOpen)
      rws.addEventListener('open', () => {
        if (localStorage.getItem("offlineMessages")) {
          const offlineArr = JSON.parse(localStorage.getItem("offlineMessages"));
          offlineArr.forEach( message => {rws.send(JSON.stringify(message));})
          localStorage.removeItem("offlineMessages");
        };
        this.setState({
          connectionStatus: rws.readyState,
          ws: rws,
          result: [],
        });
        this.getMessage();
      });
    }
    
    websocket.addEventListener('open', handleOpen)
    websocket.addEventListener('close', handleClose)  
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
      // from: `${this.state.userName} two`,
      from: `${this.state.userName} (missed ${cachedDate})`,
      message: message
    }
    let cachedMessageArr = JSON.parse(localStorage.getItem("offlineMessages"));
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
      <ConnectionStatus connectionStatus={this.state.connectionStatus}/>
      <SignForm handleNickname={this.handleNickname} isUserSigned={this.state.isUserSigned} userName={this.state.userName}/>
      <MessageList messageArr={this.state.result}  />
      <SendMessage connectionStatus={this.state.connectionStatus} handleSubmit={this.handleSubmit} cacheMessage={this.cacheMessage} isUserSigned={this.state.isUserSigned} />
    </div>
    );
  }
}

export default App;
