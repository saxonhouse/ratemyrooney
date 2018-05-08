import React, { Component } from 'react';
import './App.css';
import {RooneyRecorder} from './components/RooneyRecorder.js'

class Rooney extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Rate My Rooney</h1>
        </header>
        <RooneyRecorder />
      </div>
    );
  }
}

export default Rooney;
