import React from 'react';
// import ReconnectingWebSocket from 'reconnecting-websocket';
// // import Websocket from 'react-websocket';
// import customDateString from './utils/customDateString';
// import MessageList from './components/MessageList';
import SignForm from './components/SignForm';
import MessageListContainer from './containers/MessageListContainer';
import SendMessage from './components/SendMessage';
// import ConnectionStatus from './components/ConnectionStatus';

// import { CLOSED, OPENED } from './constants/connection-status';
// import NOTIFICATION_VISIBILITY_TIMEOUT from './constants/time-outs';


import './assets/css/App.css';

function App() {
  return (
    <div className="main">
      {/* <ConnectionStatus connectionReadyState={connectionReadyState} /> */}
      <SignForm />
      <MessageListContainer />
      <SendMessage />
    </div>
  );
}

export default App;
