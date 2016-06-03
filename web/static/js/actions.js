import { configureChannel } from './channel';

let socket = configureChannel();
let channel = socket.channel('ritual_circle');

/*
 * action types
 */

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';

export const ADD_MESSAGE_REQUEST = 'ADD_MESSAGE_REQUEST';
export const ADD_MESSAGE_SUCCESS = 'ADD_MESSAGE_SUCCESS';
export const ADD_MESSAGE_FAILURE = 'ADD_MESSAGE_FAILURE';

export const COMPLETE_MESSAGE = 'COMPLETE_MESSAGE';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action creators
 */

function fetchMessagesRequest() {
  return { type: FETCH_MESSAGES_REQUEST };
}

function fetchMessagesSuccess(messages) {
  return { type: FETCH_MESSAGES_SUCCESS, messages };
}

function fetchMessagesFailure(error) {
  return { type: FETCH_MESSAGES_FAILURE, error };
}

function addMessageRequest(text) {
  return { type: ADD_MESSAGE_REQUEST, text };
}

function addMessageSuccess(text) {
  return { type: ADD_MESSAGE_SUCCESS, text };
}

function addMessageFailure(text, error) {
  return { type: ADD_MESSAGE_FAILURE, text, error };
}

export function addMessage(text) {
  return dispatch => {
    dispatch(addMessageRequest(text));

    let payload = {
      text: text
    };

    console.log("pushing spell!", payload);
    channel.push('new:spell', payload)
      .receive('ok', response => {
        console.log('created MESSAGE', response);
      })
      .receive('error', error => {
        console.error(error);
        dispatch(addMessageFailure(text, error));
      });
  };
}

export function fetchMessages() {
  return dispatch => {
    dispatch(fetchMessagesRequest());

    channel.join()
      .receive('ok', messages => {
        console.log('catching up', messages);
        dispatch(fetchMessagesSuccess(messages.spells));
      })
      .receive('error', reason => {
        console.log('failed join', reason);
        dispatch(fetchMessagesFailure(reason));
      })
      //.after(10000, () => console.log('Networking issue. Still waiting...'));

    channel.on('new:spell', msg => {
      console.log('new:spell', msg);
      dispatch(addMessageSuccess(msg.text));
    });
  };
}

export function completeMessage(index) {
  return { type: COMPLETE_MESSAGE, index };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}