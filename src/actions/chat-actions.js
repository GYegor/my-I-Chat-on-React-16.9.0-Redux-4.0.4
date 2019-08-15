import customDateString from '../utils/customDateString';
import { OPENED, CLOSED } from '../constants/connection-status';


export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CACHE_MESSAGE = 'CACHE_MESSAGE';
export const HANDLE_NICKNAME = 'HANDLE_NICKNAME';
export const ON_CONNECTION_OPENED = 'ON_CONNECTION_OPENED';
export const ON_CONNECTION_CLOSED = 'ON_CONNECTION_CLOSED';
export const ON_MESSAGE = 'ON_MESSAGE';

export function sendMessage(message, connection, userName) {
  return function middle(dispatch) {
    const messageObject = {
      from: userName,
      message,
    };
    connection.send(JSON.stringify(messageObject));
    dispatch({ type: SEND_MESSAGE });
  };
}

export function cacheMessage(message, userName) {
  return function middle(dispatch) {
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
    dispatch({ type: CACHE_MESSAGE });
  };
}

export function handleNickname(text) {
  return function middle(dispatch) {
    localStorage.setItem('loggedAs', text);
    dispatch({ type: HANDLE_NICKNAME, userName: text });
  };
}


export function onConnectionOpened(connection) {
  return function middle(dispatch) {
    const offlineMessages = localStorage.getItem('offlineMessages');
    if (offlineMessages) {
      connection.send(offlineMessages);
      localStorage.removeItem('offlineMessages');
    }
    dispatch({ type: ON_CONNECTION_OPENED, connectionReadyState: OPENED });
  };
}

export function onConnectionClosed() {
  return { type: ON_CONNECTION_CLOSED, connectionReadyState: CLOSED };
}


export function onMessage(newData, messageIds) {
  return function middle(dispatch) {
    const recievedMessages = JSON.parse(newData);
    const newMessages = recievedMessages.filter((message) => messageIds.indexOf(message.id) === -1);
    const newIds = newMessages.map((message) => message.id);
    dispatch({ type: ON_MESSAGE, messages: newMessages.reverse(), messageIds: newIds });
  };
}
