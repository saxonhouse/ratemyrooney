import React, { Component } from 'react';
import Meter from '../libs/meter';
import Mic from './Mic';
import { RooneyHead } from './RooneyHead';


export class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ivol : 0,
      svol : 0,
      cvol : 0,
      ivavg : 0,
      svavg : 0,
      constraints : {
        audio: true,
        video: false
      },
      error: ''
    }
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
    this.startMeter = this.startMeter.bind(this);
    this.finished = this.finished.bind(this);
  }
  handleSuccess(context,mic) {
    this.setState({error: ''});
    var audioCtx = context;
    var stream = stream;
    // Put variables in global scope to make them available to the
    // browser console.
    var soundMeter = new Meter.soundMeter(audioCtx, mic);
      var c = 0;
      var ivtot = 0;
      var svtot = 0;
      this.handleSuccess.interval = setInterval(() => {
        c += 1;
        ivtot += soundMeter.instant;
        svtot += soundMeter.slow;
        this.setState( {
          ivol : soundMeter.instant.toFixed(2),
          svol : soundMeter.slow.toFixed(2),
          cvol : soundMeter.clip,
          ivavg : ivtot / c,
          svavg : svtot / c
        })
        }, 200);
  }

  handleError(error) {
  let e = 'navigator.getUserMedia error: ' + error;
  this.setState({error: e});
  }

  startMeter(c, s) {
    navigator.mediaDevices.getUserMedia(this.state.constraints).
      then(this.handleSuccess(c,s)).catch(this.handleError);
    }

  finished(blob) {
      clearInterval(this.handleSuccess.interval);
      this.props.getScore(this.state.ivavg, blob.size);
      this.props.finished(blob);
  }

  render() {
    return (
      <div>
      <RooneyHead size={150+ 200*(this.state.ivol)} />
      <Mic whileRecording={this.handleSuccess} finished={this.finished} />
      <p>{this.state.error}</p>
      </div>
    )
  }
}
