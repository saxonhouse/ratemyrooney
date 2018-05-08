import React, { Component } from 'react';
import Rooney from './Rooney';
import axios from 'axios';

class RooneyBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  loadRooneysFromServer = () => {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }
  componentDidMount() {
    this.loadRooneysFromServer();
    setInterval(this.loadRooneysFromServer, this.props.pollInterval);
  }
  render() {
    let rooneyNodes = this.props.data.map(rooney => {
      return (
        <Rooney player={ rooney.player } key={ rooney[_id] }>
          { rooney.audio }
          { rooney.score }
        </Rooney>
      )
    })

    return (
      <div >
        { rooneyNodes }
      </div>
    )
  }
}

export default RooneyBoard;
