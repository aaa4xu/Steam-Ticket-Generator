const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const {promisify} = require('util');

const getTicket = (accountName, password, twoFactorCode, appid) => {
    return new Promise((resolve, reject) => {
        const client = new SteamUser();

        client.logOn({
            accountName,
            password,
            twoFactorCode,
        });

        client.on('loggedOn', (details) => {
            client.setPersona(SteamUser.EPersonaState.Online);
            client.gamesPlayed(appid, true);
            client.getAuthSessionTicket(appid, (err, ticket) => {
                if(err) return reject(err);

                resolve({
                    accountId: details.client_supplied_steamid.low,
                    ticket,
                });
            });
        });

        client.on('error', reject);
    });
};

const getSteamGuardCode = sharedSecret => {
    return promisify(SteamTotp.getTimeOffset)().then(offset => {
        return SteamTotp.generateAuthCode(sharedSecret, offset);
    });
};

/**
 *
 * @param {string} accountName
 * @param {string} password
 * @param {string} secondFactor - Steam Guard Code or shared_secret
 * @param {number} appid
 * @return {Promise<{accountId: number, ticket: Buffer}>}
 */
module.exports = async (accountName, password, secondFactor, appid) => {
    if(secondFactor.length > 5) {
        secondFactor = await getSteamGuardCode(secondFactor);
    }

    return await getTicket(accountName, password, secondFactor, appid);
};