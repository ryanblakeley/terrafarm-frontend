var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('./src/graphql/data/schema.json');

module.exports = getbabelRelayPlugin(schema.data);
