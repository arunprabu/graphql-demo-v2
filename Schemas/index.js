const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

// Queries
const { GET_USER_BY_ID, GET_USER_LIST } = require('./Queries/User');
const { GET_POST_LIST } = require('./Queries/Post');
const { GET_BOOK_BY_ID } = require('./Queries/Book');

// Mutations
const { CREATE_USER, UPDATE_USER } = require('./Mutations/User');

// Root Query represents app wide queries
const RootQuery = new GraphQLObjectType({
  // Root Query Config 
  name: "RootQueryV2", // you can decide on the name -- anything you want. it should be a string 
  description: "Root Query for the whole app",
  fields: {
    hello: { // query hello being defined 
      type: GraphQLString, // return type
      description: "hello will return a string 'Hello World'",  // will be visible in docs 
      resolve(parent, args){
        console.log('Inside Hello Resolver!');
        return "Hello World!";
      }
    },
    greet: {
      type: GraphQLString,
      description: 'personName is expected and to be String',
      args: {
        personName: { type: GraphQLString }
      },
      resolve(parent, args){
        console.log(args); // args will be an object
        return `Good Morning, ${args.personName}!`;
      }
    },
    age: {
      type: GraphQLInt,
      resolve(){
        return 99;
      }
    },
    book: GET_BOOK_BY_ID,
    user: GET_USER_BY_ID,
    userList: GET_USER_LIST,
    posts: GET_POST_LIST
  }
}); // Let's focus on this one now


// Now Let's work on Mutations
// Http Methods - POST, PUT, PATCH, DELETE can be handled here
const Mutation = new GraphQLObjectType({
  // Mutation Config
  name: "MutationsV2",
  fields: {
    createUser: CREATE_USER,
    updateUser: UPDATE_USER
    // TODO: Work on DeleteUser
    // get only id as arg 
    // after deleting just send the status.
    // return type should be string or obj. 
    // it can't be UserType
  }
})

// Let's have the schema for the app
// Schema is a combination of query and mutation
const schema = new graphql.GraphQLSchema({
  //it expects query inside
  query:  RootQuery,    // we have to create RootQuery for the app and associate it here
  mutation: Mutation   // we have to add mutation for the app and associate it here
});

module.exports = schema;