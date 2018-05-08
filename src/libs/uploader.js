const axios = require('axios');
const AWS = require('aws-sdk');
const options = require('./options.js');
AWS.config.update(options);
const s3 = new AWS.S3();

const Uploader = {
  upload(file, filename, data) {
    console.log('uploading');
    function send(file, filename, callback) {
      var params = {
        Body: file,
        Bucket: 'ratemyrooney',
        Key: filename,
        ContentType: 'audio/mp3',
      };
    var putObjectPromise = s3.putObject(params).promise();
    putObjectPromise.then(callback).catch((e) => {
      throw { error: e, message: 'Error: Could not upload your big Rooney'};
    });
    }
    function rooneyPost(data) {
      axios.post('http://localhost:3001/api/rooneys', data).then(function(response, data) {
            console.log(response);
        }).catch((e) => {
          throw { error: e, message: 'Error: Could not save big Rooney to database'};
        });
      }
    send(file, filename, rooneyPost(data));
  }

}

module.exports = Uploader;
