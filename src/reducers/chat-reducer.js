import {
  SEND_MESSAGE,
  CACHE_MESSAGE,
  HANDLE_NICKNAME,
  ON_CONNECTION_OPENED,
  ON_CONNECTION_CLOSED,
  ON_MESSAGE,
} from '../actions/chat-actions';

import { CLOSED } from '../constants/connection-status';
import { CHAT_WSS_PROXY_URL } from '../constants/urls';

const connection = new WebSocket(CHAT_WSS_PROXY_URL);
const connectionReadyState = CLOSED;
const userName = localStorage.getItem('loggedAs');
const messages = [];
const messageIds = [];
const isWindowInactive = false;

const initialState = {
  connection,
  connectionReadyState,
  userName,
  messages,
  messageIds,
  isWindowInactive,
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return state;
    case CACHE_MESSAGE: {
      return state;
    }
    case HANDLE_NICKNAME: {
      return { ...state, userName: action.userName };
    }
    case ON_CONNECTION_OPENED: {
      return { ...state, connectionReadyState: action.connectionReadyState };
    }
    case ON_CONNECTION_CLOSED: {
      return {
        ...state,
        connectionReadyState: action.connectionReadyState,
        connection: action.connection,
      };
    }
    case ON_MESSAGE: {
      return { ...state, messages: [...state.messages, ...action.messages] };
    }
    default:
      return state;
  }
}
