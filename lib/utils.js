/**
 * Created by idoschachter on 22/03/2016.
 */
'use strict';

const _ = require('lodash');
const handlers = require('./handlers');

function isMagic(input) {
    return input.substr(0, 2) === '$$';
}

function stripMagic(input) {
    return input.substr(2);
}
function stripArgs(input) {
    let index = input.indexOf('(');
    return index !== -1 ? input.substr(0, index) : input;
}
function parseArgs(input) {
    let args = _.first(input.match(/\(([^)]+)\)/));
    if (_.contains(args, ',')) {
        args = args.replace('(', '').replace(')', '').split(',');
    }
    return args;
}
function handleValue(input, seed) {
    let fnName = stripArgs(input);

    if (_.isFunction(fnName)) {
        return fnName(seed, parseArgs(input));
    }
    if (_.isFunction(handlers[fnName])) {
        return handlers[fnName](seed, parseArgs(input));
    }
    return input;
}
module.exports = {
    isMagic: isMagic,
    stripMagic: stripMagic,
    parseArgs: parseArgs,
    handleValue: handleValue
};