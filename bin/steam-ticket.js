#! /usr/bin/env node
const {promisify} = require('util');
const SteamTotp = require('steam-totp');
const Generator = require('../src');

if(process.argv.length < 6) {
    return console.log('Using: steamticket username password shared_secret appid');
}

const [,, username, password, key, appid] = process.argv;

promisify(SteamTotp.getTimeOffset)().then(offset => {
    const code = SteamTotp.generateAuthCode(key, offset);
    return Generator(username, password, code, parseInt(appid, 10));
}).then(({ticket}) => {
    console.log(ticket.toString('hex'));
    process.exit(0);
}, err => {
    console.error(err.stack || err);
    process.exit(1);
});