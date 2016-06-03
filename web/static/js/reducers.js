import { combineReducers } from 'redux';
import { SOCKET_CONNECTED, SOCKET_DISCONNECTED, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, FETCH_MESSAGES_FAILURE, ADD_MESSAGE_REQUEST, ADD_MESSAGE_SUCCESS, ADD_MESSAGE_FAILURE, COMPLETE_MESSAGE, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions';
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;

    default:
      return state;
  }
}

function spells(state = [], action) {
  switch (action.type) {
    case FETCH_MESSAGES_SUCCESS:
      return [].concat(action.messages);

    case ADD_MESSAGE_REQUEST:
      return state;

    case ADD_MESSAGE_SUCCESS:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];

    case ADD_MESSAGE_FAILURE:
      console.error('ADD_MESSAGE_FAILURE');
      return state;

    case COMPLETE_MESSAGE:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ];

    default:
      return state;
  }
}

function isLoading(state = false, action) {
  switch (action.type) {
    case FETCH_MESSAGES_REQUEST:
      return true;

    case FETCH_MESSAGES_SUCCESS:
    case FETCH_MESSAGES_FAILURE:
      return false;

    default:
      return state;
  }
}

function isConnected(state = false, action) {
  switch (action.type) {
    case SOCKET_CONNECTED:
      return true;

    case SOCKET_DISCONNECTED:
      return false;

    default:
      return state;
  }
}

const messageApp = combineReducers({
  visibilityFilter,
  spells,
  isConnected,
  isLoading
});

export default messageApp;