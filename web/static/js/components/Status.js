import React, { Component, PropTypes } from 'react';

export default class Status extends Component {
  render() {
    return (
      <p>
        Status:
        <span style={{'padding-left': '10px'}}>
          { this.props.isConnected ? this._renderConnected() : this._renderDisconnected() }
        </span>
      </p>
    )
  }
  
  _renderConnected() {
    return (
      <span className='label label-success'>Connected</span>
    )
  }
  
  _renderDisconnected() {
    return (
      <span className='label label-warning'>Disconnected</span>
    )
  }
}

Status.propTypes = {
  isConnected: PropTypes.bool.isRequired
};