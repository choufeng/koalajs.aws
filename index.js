'use strict';

var fs = require('fs');
var path = require('path');

const AWS = require('aws-sdk')

AWS.config.update({
  region: "ap-southeast-1"
})

exports.get = function(event, context, callback) {
  // var contents = fs.readFileSync(`public${path.sep}index.html`);

  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName : "Movies",
  }
  docClient.query(params, function(err, data) {
    if (err) {
      var result = {
        statusCode: 500,
        // body: contents.toString(),
        body: 'db error',
        headers: {'content-type': 'text/html'}
      }
      callback(null, 'hello,Jon');
    } else {
      let str = ''
      data.Items.forEach(function(item) {
        str += item.id
      })

      var result = {
        statusCode: 200,
        body: 'hello Jon: ' + str,
        headers: {'content-type': 'text/html'}
      };

      callback(null, 'hello,Jon');
    }
  })
};
