import React, { Component } from 'react';

class RooneyStar extends Component {
  render() {
    return <p> Rooney </p>
  }
}

export class RooneyRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    var rooneys = []
    for (var i = 0; i < Math.round(this.props.score); i++) {
      rooneys.push(<RooneyStar key={i} />);
    }
    return (
      <div>
      {rooneys}
      </div>
    )
  }
}
