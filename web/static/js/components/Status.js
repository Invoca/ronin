import React, { Component, PropTypes } from 'react';

export default class Status extends Component {
  render() {
    return (
      <p>
        Status:
        <span style={{paddingLeft: '5px'}}>
          { this.props.isConnected ? this._renderConnected() : this._renderDisconnected() }
        </span>
          
        <br />
        Other nodes: { this._renderNodes() }
      </p>
    )
  }
  
  _renderConnected() {
    return (
      <span className='label label-success'>Connected to { this.props.servers.local }</span>
    )
  }
  
  _renderDisconnected() {
    return (
      <span className='label label-warning'>Disconnected from { this.props.servers.local }</span>
    )
  }
  
  _renderNodes() {
    if (this.props.servers.remote.length === 0) {
      return (<i>No other nodes</i>)
    }
    
    return (this.props.servers.remote.map(node => {
      return (<span key={node} className='label label-default' style={{marginRight: '5px'}}>{node}</span>)
    }))
  }
}

Status.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  servers: PropTypes.object.isRequired
};