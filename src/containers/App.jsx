import React, { Component } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
// import Websocket from 'react-websocket';
import customDateString from '../utils/customDateString';
import MessageList from '../components/MessageList';
import SendMessage from './SendMessage';
import SignForm from './SignForm';
import ConnectionStatus from '../components/ConnectionStatus';

import { CLOSED, OPENED } from '../constants/connection-status';
import NOTIFICATION_VISIBILITY_TIMEOUT from '../constants/time-outs';


import '../assets/css/App.css';

class App extends Component {
  static notify(newMessage) {
    const note = new Notification('RS-i-Chat', {
      icon: './favicon.ico',
      body: `${newMessage.from}: "${newMessage.message}" at ${customDateString(newMessage.time)}`,
    });

    note.onclick = () => {
      window.focus('https://rs-i-chat.herokuapp.com/');
    };

    setTimeout(note.close.bind(note), NOTIFICATION_VISIBILITY_TIMEOUT);
  }

  constructor() {
    super();

    const connection = new WebSocket('wss://wssproxy.herokuapp.com/');
    const connectionReadyState = CLOSED;
    const userName = localStorage.getItem('loggedAs');
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

    this.onConnectionClose = this.onConnectionClose.bind(this);
    this.onConnectionOpen = this.onConnectionOpen.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.cacheMessage = this.cacheMessage.bind(this);
    this.handleNickname = this.handleNickname.bind(this);
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
    connection.addEventListener('open', this.onConnectionOpen);
    connection.addEventListener('close', this.onConnectionClose);
    connection.addEventListener('message', this.onMessage);
    // connection.addEventListener('error', this.onConnectionError);
  }


  componentDidUpdate() {
    // this.statusHandler()
    window.scrollTo(0, document.body.scrollHeight);
  }


  onConnectionOpen() {
    const { connection } = this.state;
    this.setState({
      connectionReadyState: OPENED,
    });

    const offlineMessages = localStorage.getItem('offlineMessages');
    if (offlineMessages) {
      connection.send(offlineMessages);
      localStorage.removeItem('offlineMessages');
      connection.addEventListener('close', this.onConnectionClose);
    }
  }


  onConnectionClose() {
    const rws = new ReconnectingWebSocket('wss://wssproxy.herokuapp.com/');

    this.setState({
      connection: rws,
      connectionReadyState: CLOSED,
    });

    const { connection } = this.state;
    // rws.addEventListener('close', this.onConnectionClose);
    connection.addEventListener('open', this.onConnectionOpen);
    connection.addEventListener('message', this.onMessage);
  }


  onMessage({ data }) {
    const { messageIds, isWindowInactive } = this.state;
    const recievedMessages = JSON.parse(data);
    const newMessages = recievedMessages.filter((message) => messageIds.indexOf(message.id) === -1);
    const newIds = newMessages.map((message) => message.id);
    const [lastMessage] = newMessages;
    if (isWindowInactive && lastMessage) {
      App.notify(lastMessage);
    }

    newMessages.reverse();
    this.setState((prevState) => ({
      messages: [...prevState.messages, ...newMessages],
      messageIds: [...prevState.messageIds, ...newIds],
    }));
  }


  sendMessage(message) {
    const { connection, userName } = this.state;
    const messageObject = {
      from: userName,
      message,
    };
    connection.send(JSON.stringify(messageObject));
  }

  cacheMessage(message) {
    const { userName } = this.state;
    const offlineMessages = localStorage.getItem('offlineMessages');

    if (!offlineMessages) {
      const cachedDate = customDateString(Date.now());
      const firstMissedMessage = {
        from: `${userName} (missed ${cachedDate})`,
        message,
      };
      localStorage.setItem('offlineMessages', JSON.stringify(firstMissedMessage));
    } else {
      const allCachedMessages = JSON.parse(offlineMessages);
      allCachedMessages.message += `\n ${message}`;
      localStorage.setItem('offlineMessages', JSON.stringify(allCachedMessages));
    }
  }


  handleNickname(text) {
    localStorage.setItem('loggedAs', text);
    this.setState({
      userName: text,
    });
  }

  render() {
    const {
      connectionReadyState,
      userName,
      messages,
    } = this.state;
    // const {
    //   sendMessage,
    //   cacheMessage,
    //   handleNickname,
    // } = this;
    return (
      <div className="main">
        <ConnectionStatus connectionReadyState={connectionReadyState} />
        <SignForm
          handleNickname={this.handleNickname}
          userName={userName}
        />
        <MessageList messages={messages} />
        <SendMessage
          connectionReadyState={connectionReadyState}
          sendMessage={this.sendMessage}
          cacheMessage={this.cacheMessage}
          userName={userName}
        />
      </div>
    );
  }
}

export default App;
