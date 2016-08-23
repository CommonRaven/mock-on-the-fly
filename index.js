'use strict';

const _ = require('lodash');
const mockOTF = require('./lib');
const fs = require('fs');
var Transform = require('stream').Transform;
var Writable = require('stream').Writable;

let size = 10000000;
var model = [`$$${size}`, {
    id: '$$randomString',
    id_2: '$$randomString',
    date: '$$date',
    country: '$$country',
    name: {'$$oneOf': ['a', 'b', 'c', '1', '2', '3']},
    app: {'$$oneOf': require('./appNames.json')}
}];

var seed = 'n54g8gg57pe1e0e6208m3h9bcpb23bd8lekmgm8o9jd';

let i = 0;

let parser = new mockOTF.Parser(model, seed, {objectMode: true});

let transform = new Transform({objectMode: true});
transform._transform = function (data, encoding, done) {
    console.log(i);
    this.push(JSON.stringify(data))
    i++;
    done();
};

var wstream = fs.createWriteStream('myOutput.json');
parser
    .pipe(transform)
    .pipe(wstream);
