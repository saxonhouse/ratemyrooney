import React, { Component } from 'react';

const MicRecorder = require('mic-recorder-to-mp3');

class Button extends Component {
  render() {
    return (
    <button onClick={this.props.onClick}>{this.props.text}</button>
  )
  }
}

class Mic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      file : {},
      recorder: null,
      error: '',
    };
    this.init = this.init.bind(this);
    this.record = this.record.bind(this);
    this.finished = this.finished.bind(this);
  }

  init() {
    const recorder = new MicRecorder({
      bitRate: 128
    });
    this.setState({recorder: recorder}, () => {
      this.record();
    });

  }

  record() {
    if (this.state.clicked === false) {
      this.state.recorder.start().then(() => {
        this.props.whileRecording(this.state.recorder.context, this.state.recorder.microphone);
        this.setState({ clicked: true, error: '' });
      }).catch((e) => {
        this.setState({ error: 'Error: could not find or access microphone'});
        console.log(e)
      });
    }
    else {
      this.setState({ clicked: false });
      this.finished();
    }
  }

  finished() {
    this.state.recorder
    .stop()
    .getMp3().then(([buffer, blob]) => {
      this.props.finished(blob);
    }).catch((e) => {
      this.setState({error: 'Error: Data not recorded'});
      console.log(e);
    });
  }

  render() {
    return(
    <div>
      <Button onClick={this.state.clicked ? this.finished : this.init} text={this.state.clicked ? 'Stop' : 'Record'} />
      <p> {this.state.error} </p>
    </div>
    )
  }
}


export default Mic;
