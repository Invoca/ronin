import React, { Component, PropTypes } from 'react';

export default class AddTodo extends Component {
  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <input className='form-control' placeholder='Cast a spell' type='text' ref='input' onKeyPress={e => this.handleKeyPress(e)} />
          <button className='btn btn-primary' style={{'margin-left': '10px'}} onClick={e => this.handleClick(e)}>
            Captivate
          </button>
        </div>
      </form>
    )
  }

  handleClick(e) {
    const node = this.refs.input
    const text = node.value.trim()
    this.props.onAddClick(text)
    node.value = ''
  }

  handleKeyPress(e) {
    if (e.charCode === 13) { 
      this.handleClick(e);
      e.preventDefault();
    }
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
};