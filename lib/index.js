/**
 * Created by idoschachter on 22/03/2016.
 */
'use strict';

const _ = require('lodash');
const seedrandom = require('seedrandom');

const handlers = require('./handlers');
const utils = require('./utils');
const Readable = require('stream').Readable;

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

class Parser extends Readable {
    constructor(schemaDef, seed, options) {
        super(options);
        let isArray = _.isArray(schemaDef);

        this.seed = seed;
        this.size = 0;
        this.maxSize = isArray && utils.isMagic(_.first(schemaDef)) ? utils.stripMagic(_.first(schemaDef)) : 1;
        this.schema = isArray ? schemaDef[1] : schemaDef;

        // makes sure all randomness is not so random after all ;)
        if (this.seed) {
            seedrandom(this.seed, {global: true});
        }

    }

    _read() {
        if (this.size > this.maxSize) {
            return this.push(null);
        }
        let item = buildModel(this.schema, this.seed);
        this.size++;
        this.push(item);
    }
}

module.exports = {
    Parser: Parser,
    utils: utils,
    handlers: handlers
};