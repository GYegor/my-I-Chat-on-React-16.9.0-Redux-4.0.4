import React, {Component} from 'react';
// import Websocket from 'react-websocket';
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ws: new WebSocket('ws://st-chat.shas.tel'),
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
      from: 'GY',
      message: message
    }
    websocket.send(JSON.stringify(messageObject));
    console.log(JSON.stringify(messageObject));
  }


  handleSubmit = (message) => {
    this.sendMessage(message);
  }


  componentDidMount() {
    this.getMessage();
  }


  componentDidUpdate() {
    // this.onMessage();
    window.scrollTo(0, document.body.scrollHeight);
  }

  handleData = (data) => {
    let newData = JSON.parse(data);
    console.log(newData);
    // console.log(newDta);
  }


  render() {
    return (
    <div className="main">
      <MessageList data={this.state.result}  />
      {/* <Websocket url='ws://st-chat.shas.tel' onMessage={this.handleData} /> */}
      <SendMessage handleSubmit={this.handleSubmit} />
    </div>
    );
  }
}

export default App;
