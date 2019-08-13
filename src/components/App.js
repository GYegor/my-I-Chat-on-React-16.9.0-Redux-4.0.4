import React, {Component} from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
// import Websocket from 'react-websocket';
import customDateString from "../utils/customDateString"
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";
import SignForm from "./SignForm";
import ConnectionStatus from "./ConnectionStatus";

import { CLOSED } from '../constants/connection-status';


import '../App.css';

class App extends Component {
  constructor() {
    super();

    const connection = new WebSocket('ws://st-chat.shas.tel');
    const connectionReadyState = CLOSED;
    const userName = localStorage.getItem("loggedAs");  
    const messages = [];
    const messageIds = [];
    const isWindowInactive = false;

    this.state = {
      connection,
      connectionReadyState,
      userName,
      messages,
      messageIds,
      isWindowInactive,
    };
  }

  componentDidMount() {
    // window.scrollTo(0, document.body.scrollHeight);
    Notification.requestPermission();
    window.onblur = () => this.setState({
      isWindowInactive: true,
    });
    window.onfocus = () => this.setState({
      isWindowInactive: false,
    });

    const { connection } = this.state;
    connection.addEventListener('open', this.onConnecionOpen);
    connection.addEventListener('close', this.onConnectionClose);
    connection.addEventListener('message', this.onMessage);
    // connection.addEventListener('error', this.onConnectionError); 
  }


  // componentDidUpdate() {
  //   // this.statusHandler()
  //   window.scrollTo(0, document.body.scrollHeight);
  // }


  onConnectionOpen = () => {
    const { connection } = this.state;
    const offlineMessages = localStorage.getItem("offlineMessages");

    this.setState({
      connectionReadyState: connection.readyState,
    });
    console.log(this.state.connectionReadyState);

    if (offlineMessages) {
      connection.send(offlineMessages);
      localStorage.removeItem("offlineMessages");
    }

  }


  onConnectionClose = () => {
    const { connection } = this.state;
    const rws = new ReconnectingWebSocket('ws://st-chat.shas.tel');

    this.setState({
      connection: rws,
      connectionReadyState: connection.readyState,
    });

    rws.addEventListener('open', this.onConnectionOpen)
  }



  onMessage = ({ data }) => {
    const { messageIds, isWindowInactive } = this.state;
    const recievedMessages = JSON.parse(data);
    const newMessages = recievedMessages.filter(message => messageIds.indexOf(message.id) !== -1)
    const newIds = newMessages.map(message => message.id)
    const [ lastMessage ] = newMessages;    
    
    if (isWindowInactive) {
      this.notify(lastMessage);
    }

    // recievedMessages.reverse();
    this.setState(prevState => ({ 
      messages: [...prevState.messages, ...newMessages],
      messageIds: [...prevState.messageIds, ...newIds],
      }));
  }







  notify = (newMessage) => {
    const note = new Notification("RS-i-Chat", {
      icon: './favicon.ico',
      body: `${newMessage.from}: "${newMessage.message}" at ${customDateString(newMessage.time)}`
    });
    
    note.onclick = () => {
      window.open('http://localhost:3000/')
    }

    // setTimeout(note.close.bind(note), NOTIFICATION_VISIBILITY_TIMEOUT);
  } 



  sendMessage = (message) => {
    const { connection, userName } = this.state;
    const messageObject = {
      from: userName,
      message: message
    }
    connection.send(JSON.stringify(messageObject));
  }

  cacheMessage = (message) => {
    const { userName } = this.state
    const offlineMessages = localStorage.getItem("offlineMessages");
    
    if (!offlineMessages) {
      const cachedDate = customDateString(Date.now());
      const firstMissedMessage = {
        from: `${userName} (missed ${cachedDate})`,
        message,
      }
      localStorage.setItem("offlineMessages", JSON.stringify(firstMissedMessage));
    } else {
      const allCachedMessages = JSON.parse(offlineMessages);
      allCachedMessages.message += `\n ${message}`;
      localStorage.setItem("offlineMessages", JSON.stringify(allCachedMessages));
    }
  }


  handleNickname = (text) => {
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


  render = () => (
    <div className="main">
      <ConnectionStatus connectionReadyState={this.state.connectionReadyState}/>
      <SignForm handleNickname={this.handleNickname} isUserSigned={this.state.isUserSigned} userName={this.state.userName}/>
      <MessageList messageArr={this.state.result}  />
      <SendMessage
        connectionStatus
        sendMessage={this.sendMessage}
        cacheMessage={this.cacheMessage}
        isUserSigned={this.state.isUserSigned}
      />
    </div>
  );

}

export default App;
