import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { socket, socketConnected, socketDisconnected, fetchMessages, addMessage, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions';
import AddMessage from '../components/AddMessage';
import MessageList from '../components/MessageList';
import Status from '../components/Status';


class App extends Component {
  componentDidMount() {
    let { dispatch } = this.props;

    socket.onOpen(msg => {
      console.log('SOCKET open', msg);
      return dispatch(socketConnected());
    });


    socket.onError(msg => {
      console.log('SOCKET error', msg);
      return dispatch(socketDisconnected());
    });

    dispatch(fetchMessages());
  }

  render() {
    // Injected by connect() call:
    const { dispatch, visibleTodos, isLoading, isConnected, visibilityFilter } = this.props;
     
    return (
      <div>
        <Status
          isConnected={isConnected} />
        <h4>Spells:</h4>
        <MessageList
          spells={visibleTodos}
          isLoading={isLoading}
          onTodoClick={index =>
            dispatch(completeTodo(index))
        } />
        <hr />
        <AddMessage
          onAddClick={text =>
            dispatch(addMessage(text))
          } />
      </div>
    );
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  })),
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
};

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    visibleTodos: selectTodos(state.spells, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter,
    isLoading: state.isLoading,
    isConnected: state.isConnected
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);