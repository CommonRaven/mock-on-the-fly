/**
 * Created by idoschachter on 22/03/2016.
 */
const _ = require('lodash');

function randomString() {
    return (Math.random() * 1000).toString(26).split('.')[1];
}
function randomDate() {
    return new Date(Math.random());
}
module.exports = {
    $$randomString: randomString,
    $$date: randomDate
};