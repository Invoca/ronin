import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { socket, socketConnected, socketDisconnected, fetchMessages, addMessage } from '../actions';
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
      console.log('SOCKET error', msg, this.props.isConnected);
      setTimeout(() => { console.log("After timeout", this.props.isConnected) },  1 * 1000);
      setTimeout(() => { console.log("After timeout", this.props.isConnected) }, 10 * 1000);
      return dispatch(socketDisconnected());
    });

    dispatch(fetchMessages());
  }

  render() {
    // Injected by connect() call:
    const { dispatch, visibleTodos, servers, isLoading, isConnected } = this.props;
     
    return (
      <div>
        <Status
          isConnected={isConnected}
          servers={servers} />
        <h4>Spells:</h4>
        <MessageList
          spells={visibleTodos}
          isLoading={isLoading} />
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
    timestamp: PropTypes.string.isRequired
  }))
};


// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    visibleTodos: state.spells,
    servers: state.servers,
    isLoading: state.isLoading,
    isConnected: state.isConnected
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);