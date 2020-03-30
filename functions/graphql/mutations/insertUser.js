// const gql = require("graphql-tag");
const insertUser = `
  mutation insert_user($objects: [user_insert_input!]!) {
    insert_user(objects: $objects) {
      affected_rows
    }
  }
`;

module.exports = {
  insertUser
};
