const SteamUser = require('steam-user');

/**
 *
 * @param {string} accountName
 * @param {string} password
 * @param {string} twoFactorCode
 * @param {number} appid
 * @return {Promise<Buffer>}
 */
module.exports = (accountName, password, twoFactorCode, appid) => {
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
            client.getAuthSessionTicket(appid, (err, ticket) => err ? reject(err) : resolve(ticket));
        });
    });
};