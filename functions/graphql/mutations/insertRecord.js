// const gql = require("graphql-tag");
const insertRecord = `
  mutation insert_record($objects: [record_insert_input!]!) {
    insert_record(objects: $objects) {
      returning{
        id
      }
    }
  }
`;

module.exports = {
  insertRecord
};
