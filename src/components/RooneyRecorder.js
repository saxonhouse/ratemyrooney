import React, { Component } from 'react';
import {Audio} from './Audio';
import RooneyForm from './RooneyForm';
import {RooneyRating} from './RooneyRating';
var Uploader = require('../libs/uploader.js')


export class RooneyRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      buttonText: 'Record',
      file: null,
      preRooney: true,
      score : 0,
      context: null,
      recording: false,
      error: ''
    };
    this.getScore = this.getScore.bind(this);
    this.finished = this.finished.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  getScore(volume, size) {
    let vScore = Math.round( volume * 10)
    let sScore = Math.round( size / 10000);
    let score = (vScore * sScore)/20;
    console.log(score);
    this.setState({score: score});
  }

  finished = (file) => {
    this.setState({preRooney: false, file: file})
  }

  onSubmit(player) {
    let filename = player + Date.now();
    let url = 'http://s3.amazonaws.com/ratemyrooney/' + filename;
    let data = {
        player: player,
        score: this.state.score,
        audio: url
      }
    /*
    try {
      Uploader.upload(this.state.file, filename, data);
    }
    catch(e) {
      this.setState({error: e.message});
      console.log(e.error);
    }
    */
  }

  render() {
    return (
      <div>
      {this.state.preRooney ?
        <div>
          <Audio finished={this.finished} getScore={this.getScore} />

        <p className="App-intro">
          Record your best big Rooney.
        </p>
        </div>
      :
      <div>
        <RooneyRating score={this.state.score} />

        <RooneyForm onRooneySubmit = {this.onSubmit} />
      </div>
      }
      <p>{this.state.error}</p>
      </div>
    );
  }


}
