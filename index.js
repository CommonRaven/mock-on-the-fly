'use strict';

const _ = require('lodash');
const mockOTF = require('./lib');

var model = ['$$1', {
    'id': '$$randomString',
    'dates': ['$$2', {
        'date': '$$date(2012,1,1)'
    }]
}];

var seed = 'n54g8gg57pe1e0e6208m3h9bcpb23bd8lekmgm8o9jd';
var mock = mockOTF.parse(model, seed);
console.log(JSON.stringify(mock, null, 2));
