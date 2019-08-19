import React from 'react';
import SignForm from './components/SignForm';
import ChatContainer from './containers/ChatContainer';
import SendMessage from './components/SendMessage';

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
