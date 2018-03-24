# Steam Ticket Generator
CLI for Steam auth session ticket generation

## Using as CLI
`steamticket username password second_factor appid`

## Using as library
```javascript
const Generator = require('steam-ticket-generator');

const secondFactor = 'ABC45'; // Steam Guard Code or shared_secret
const appid = 570;
const {ticket, accountId} = Generator('login', 'password', secondFactor, appid);
```