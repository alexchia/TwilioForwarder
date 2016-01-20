// simple express app
var express = require('express')
  , http    = require('http')
  , request = require('request')
  , bodyParser = require('body-parser')
  , xml = require('xml');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/twilio', function (req, res) {
  var from = req.body.From;
  var text = req.body.Body;

  if (!from) {
    res.json({
      err: "Error: No 'From' specified"
    })
    return;
  }
  
  if (!text) text = "";

  var data = {
    text: "",
    fields:[{
      "title": from,
      "value": text,
      "short": false
    }]
  };
  request.post({
    url: process.env.SLACK_WEBHOOK_URL,
    body: JSON.stringify(data)
  }, function (error, response, body) {
    if (error) {
      res.json({err: error});
    } else if (response.statusCode != 200) {
      res.json({err: response.statusCode});
      console.log(body);
    } else {
      var okresponse = {
        Response: {}
      }
      res.set('Content-Type', 'text/xml');
      res.send(xml(okresponse));
    }
  });
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});