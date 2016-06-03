import React, { Component, PropTypes } from 'react';
import Message from './Message';

export default class MessageList extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <p><em>Loading ...</em></p>
      );
    }

    return (
      <ul className="messages">
        {this.props.spells.map((todo, index) =>
          <Message {...todo}
                key={index}
                onClick={() => this.props.onTodoClick(index)} />
        )}
      </ul>
    );
  }
}

MessageList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  spells: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
};