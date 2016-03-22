/**
 * Created by idoschachter on 22/03/2016.
 */
'use strict';
const _ = require('lodash');

function randomString(seed, args) {
    return (Math.random() * 1000).toString(26).split('.')[1];
}
function randomDate(seed, args) {
    let end = new Date();
    let start = new Date(args);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
module.exports = {
    $$randomString: randomString,
    $$date: randomDate
};