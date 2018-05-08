

'use-strict'

//first we import our dependencies…
var express = require('express');
var cors = require('cors')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Rooney = require('./model/rooney');
var AWS = require('aws-sdk');
const options = require('./libs/options.js');
const dburi = require('./libs/dburi.js');
AWS.config.update(options);
var s3 = new AWS.S3();
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set
//it up, or 3001
var port = process.env.API_PORT || 3001;

//db config

mongoose.connect(dburi);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent rooneys
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

router.route('/rooneys')
  //retrieve all comments from the database
  .get(function(req, res) {
    //looks at our Comment Schema
    Rooney.find(function(err, rooneys) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(rooneys)
    });
  })
  //post new comment to the database
  .post(function(req, res) {
    var rooney = new Rooney();
    //body parser lets us use the req.body
    rooney.player = req.body.player;
    rooney.audio = req.body.audio;
    rooney.score = req.body.score;

    rooney.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Rooney successfully added!' });
    });
  });

router.route('/upload')
  //url for upload
  .post(function(req, res) {
    console.log('post attempted', req);

    /*  Notice that if you don't provide an albumName, the file will be automatically uploaded to the root of your bucket */
    var params = {
      Body: req.body.file,
      Bucket: 'ratemyrooney',
      Key: 'tester.mp3',
      ContentType: 'audio/mp3',
    };
    s3.putObject(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  return req.body.file;
  })


//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
