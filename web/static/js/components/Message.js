import React, { Component, PropTypes } from 'react';

export default class Message extends Component {
  render() {
    return (
      <li>
        <span className="time">{this._formatTimestamp(this.props.timestamp)}</span>
        <span className="text">{this.props.text}</span>
      </li>
    )
  }
  
  _formatTimestamp(stamp) {
    let pieces = stamp.split(":")
    if (pieces[2].length === 1) {
      pieces[2] = "0" + pieces[2]
    }
    
    return pieces.join(":")
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired
};