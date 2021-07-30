// Creating Custom Data Type -- for BookType
const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

// Also called as Type Definitions
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    category: { type: GraphQLString }
  })
});

module.exports = BookType;