const Logger = require('./Logger');
const { getDynamoDocClient } = require('./ClientFactory');
module.exports = { Logger, getDynamoDocClient };
