var moment = require('moment');
var now = moment();

console.log(now.valueOf());

var timeStamp = 1464213091356;

var timeCanRead = moment.utc(timeStamp);
console.log(timeCanRead.local().format('LTS'));