/**
 * Created by idoschachter on 22/03/2016.
 */
const _ = require('lodash');
const handlers = require('./handlers');

function isMagic(input) {
    return input.substr(0, 2) === '$$';
}

function stripMagic(input) {
    return input.substr(2);
}

function handleValue(input, seed) {
    if (_.isFunction(input)) {
        return input(seed);
    }
    if (_.isFunction(handlers[input])) {
        return handlers[input](seed);
    }
    return input;
}
module.exports = {
    isMagic: isMagic,
    stripMagic: stripMagic,
    handleValue: handleValue
};