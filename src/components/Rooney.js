import React, { Component } from 'react';

class Rooney extends Component {
  render() {
    return (
      <div style={}>
        <h3>{this.props.player}</h3>
        <audio src={this.props.audio} />
        <p> {this.props.score} </p>
      </div>
    )
  }
}

export default Rooney;
