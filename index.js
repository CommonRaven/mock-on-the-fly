'use strict';

var _ = require('lodash');

var model = ['$$5', {
    'id': '$$randomString',
    // 	dates  : ['$$365', {
    // 		date : '$$date',
    // 	}]
}];
var handlers = {
    $$randomString: function randomString() {
        return (Math.random() * 1000).toString(26).split('.')[1];
    }
}

function isMagic(input) {
    return input.substr(0, 2) == '$$';
}

function stripMagic(input) {
    return input.substr(2);
}

function handleValue(input) {
    if (_.isFunction(input)) {
        return input();
    }
    else if (_.isFunction(handlers[input])) {
        return handlers[input]();
    }
    else {
        return input;
    }
}

function buildModel(schema) {
    var obj = {};
    _.each(schema, function(value, key) {
        let realValue = handleValue(value);
        _.set(obj, key, realValue);
    });
    return obj;
}

function init(schemaDef) {
    const mockArray = _.isArray(schemaDef);
    const itemCount = mockArray && isMagic(_.first(schemaDef)) ? stripMagic(_.first(schemaDef)) : 1;
    const schema = mockArray ? schemaDef[1] : schemaDef;
    var model = [];

    while (model.length < itemCount) {
        model.push(buildModel(schema));
    }
    
    return mockArray  ? model : _.first(model);
}

var mock = init(model);
console.log('output:', mock);
