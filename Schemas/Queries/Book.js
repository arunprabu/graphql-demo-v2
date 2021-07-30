const { GraphQLInt } = require("graphql");
const BookType = require("../TypeDefs/Book");

exports.GET_BOOK_BY_ID = {
  type: BookType,
  args: { id: { type: GraphQLInt }},
  resolve(parent, args){
    console.log(args); // args will be an object -- within it we can find id
    // ideal place to execute db queries
    const bookDetails = {
      id: args.id,
      name: "How to GraphQL?",
      category: "Tech"
    }
    return bookDetails;
  }
}