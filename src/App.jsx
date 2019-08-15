import React from 'react';
// import ReconnectingWebSocket from 'reconnecting-websocket';
// // import Websocket from 'react-websocket';
// import customDateString from './utils/customDateString';
// import MessageList from './components/MessageList';
import SignForm from './components/SignForm';
import ChatContainer from './containers/ChatContainer';
import SendMessage from './components/SendMessage';
// import ConnectionStatus from './components/ConnectionStatus';

// import { CLOSED, OPENED } from './constants/connection-status';
// import NOTIFICATION_VISIBILITY_TIMEOUT from './constants/time-outs';


import './assets/css/App.css';

function App() {
  return (
    <div className="main">
      <SignForm />
      <ChatContainer />
      <SendMessage />
    </div>
  );
}

export default App;
