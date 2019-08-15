// import CHAT_WSS_PROXY_URL from '../constants/urls';
import customDateString from '../utils/customDateString';


export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CACHE_MESSAGE = 'CACHE_MESSAGE';

export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
export const DELETE_TODO = 'DELETE_TODO';
export const REQUEST_TODOS = 'REQUEST_TODOS';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const FAIL_GETTING_TODOS = 'FAIL_GETTING_TODOS';


// export function toggleTodo(id) {
//   return { type: TOGGLE_COMPLETE, id };
// }

// export function deleteTodo(id) {
//   return { type: DELETE_TODO, id };
// }

// export function requestTodos() {
//   return { type: REQUEST_TODOS };
// }

// export function receiveTodos() {
//   return { type: RECEIVE_TODOS };
// }

// export function failGettingTodos() {
//   return { type: FAIL_GETTING_TODOS };
// }


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
