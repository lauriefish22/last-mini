const { gql } = require('apollo-server-express');

const typeDefs = gql`
type tech {
    _id: ID
    name: String
}`

module.exports = typeDefs;