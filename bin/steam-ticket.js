#! /usr/bin/env node
const Generator = require('../src');

if(process.argv.length < 6) {
    return console.log('Using: steamticket username password second_factor appid');
}

const [,, username, password, secondFactor, appid] = process.argv;

Generator(username, password, secondFactor, parseInt(appid, 10)).then(({ticket}) => {
    console.log(ticket.toString('hex'));
    process.exit(0);
}, err => {
    console.error(err.stack || err);
    process.exit(1);
});