import React, { Component } from 'react';

const rooneyStyle = {
  transition: 'height 0.1s ease-out'
}

export class RooneyHead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img src="http://cdn.staticneo.com/w/footballmanager/9/90/5108390.png"
      height={this.props.size}
      style = {rooneyStyle}
      alt = 'Wayne Rooney' />
    )
  }
}
