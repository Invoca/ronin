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
        {this.props.spells.map((spell, index) =>
          <Message {...spell}
                key={index} />
        )}
      </ul>
    );
  }
}

MessageList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  spells: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired
  }).isRequired).isRequired
};