# Steam Ticket Generator
CLI for Steam auth session ticket generation

## Using as CLI
`steamticket username password shared_secret appid`

## Using as library
```javascript
const Generator = require('steam-ticket-generator');

const steamGuardCode = 'ABC45';
const appid = 570;
const code = Generator('login', 'password', steamGuardCode, appid);
```