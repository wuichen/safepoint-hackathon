// const gql = require("graphql-tag");
const insertLocation = `
  mutation insert_location($objects: [location_insert_input!]!) {
    insert_location(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

module.exports = {
  insertLocation
};
