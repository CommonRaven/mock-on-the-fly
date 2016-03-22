/**
 * Created by idoschachter on 22/03/2016.
 */
'use strict';

const _ = require('lodash');
const seedrandom = require('seedrandom');

const handlers = require('./handlers');
const utils = require('./utils');

function buildModel(schema, seed) {
    var obj = {};
    _.each(schema, function (value, key) {
        var realValue;
        if (_.isArray(value)) {
            realValue = parse(value, seed);
        } else {
            realValue = utils.handleValue(value);
        }
        _.set(obj, key, realValue);
    });
    return obj;
}

function parse(schemaDef, seed) {
    const mockArray = _.isArray(schemaDef);
    const itemCount = mockArray && utils.isMagic(_.first(schemaDef)) ? utils.stripMagic(_.first(schemaDef)) : 1;
    const schema = mockArray ? schemaDef[1] : schemaDef;
    var model = [];

    // makes sure all randomness is not so random after all ;)
    if (seed) {
        seedrandom(seed, {global: true});
    }
    while (model.length < itemCount) {
        model.push(buildModel(schema, seed));
    }

    return mockArray ? model : _.first(model);
}

module.exports = {
    parse: parse,
    utils: utils,
    handlers: handlers
};