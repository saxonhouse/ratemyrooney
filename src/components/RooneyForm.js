import React, { Component } from 'react';

class RooneyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { player: '', audio: '', score: '' };
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handlePlayerChange(e) {
    this.setState({ player: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let player = this.state.player.trim();
    if (!player) {
      return;
    }
    this.props.onRooneySubmit(player);
  }
  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='Your name...'
          value={ this.state.player }
          onChange={ this.handlePlayerChange } />
        <input
          type='submit'
          value='Post' />
      </form>
    )
  }
}

export default RooneyForm;
