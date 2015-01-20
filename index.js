//Import modules
var AWS = require('aws-sdk');
var async = require('async');
var util = require('util');
var imgur = require('imgur-node-api');
var path = require('path');

//Create S3 client

var s3 = new AWS.S3();

//Create event handler for S3
exports.handler = function(event, context) {
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
    
    for (i = 0; i < event.Records.length; i++){

        var srcKey = event.Records[i].s3.object.key;

        console.log("The file which you updated is " + srcKey);

        //Check the image type.
        var typeMatch = srcKey.match(/\.([^.]*)$/);

        if (!typeMatch) {
            console.error('unable to infer image type for key ' + srcKey);
            return;
        }

        var imageType = typeMatch[1];

        if(imageType != "jpg" && imageType ! ="png"){

            console.log('Skipping non-image ' + srcKey);

            return;
        }
    }
}

