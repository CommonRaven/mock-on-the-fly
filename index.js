'use strict';

const _ = require('lodash');
const mockOTF = require('./lib');

var model = ['$$5', {
    'id': '$$randomString',
    'dates': ['$$2', {
        'date': '$$date'
    }]
}];

var seed = 'abcdefg';
var mock = mockOTF.parse(model, seed);
console.log(JSON.stringify(mock, null, 2));
