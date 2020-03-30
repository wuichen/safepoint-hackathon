const { GraphQLClient } = require("graphql-request");
const { graphql_host, hasuraAccessKey } = require("./config");

const client = new GraphQLClient(graphql_host, {
  headers: { "x-hasura-admin-secret": hasuraAccessKey }
});
module.exports = {
  client
};
