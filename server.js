const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;


// Creating Custom Data Type -- for BookType
// Also called as Type Definitions
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    category: { type: GraphQLString }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});

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
    book: {
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
    },
    user: { // Fetching one user details by Id
      type: UserType,
      description: "Fetching one user details by id. Id should be int",
      args: {
        id: {type: GraphQLInt }
      },
      resolve(parent, args){
        console.log(args); 

        const userDetails = {
          id: args.id, 
          name: "Steve",
          phone: "234523",
          email: "s@t.com"
        }

        return userDetails;
      }
    },
    userList: {
      type: new GraphQLList(UserType),
      resolve(parent, args){
        const users = [{
          id: 1,
          name: "Steve",
          phone1: "234523",
          email: "s@t.com",

        },
        {
          id: 2,
          name: "John",
          phone1: "3423",
          email: "j@k.com"
        }];

        return users;
      }
    }
  }
}); // Let's focus on this one now


// Now Let's work on Mutations
// Http Methods - POST, PUT, PATCH, DELETE can be handled here
const Mutation = new GraphQLObjectType({
  // Mutation Config
  name: "MutationsV2",
  fields: {
    createUser: {
      type: UserType,
      //The form data from the front end will be coming as args -- similar to request body
      args: { 
        name: {type: GraphQLString },
        phone: {type: GraphQLString },
        email: {type: GraphQLString }
      },
      resolve(parent, args) {
        console.log(args);
        // ideal place for you to exec db query to save the above form data coming in args
        return {
          id: 999,
          name: args.name,
          phone: args.phone,
          email: args.email,
        }
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
        name: {type: GraphQLString },
        phone: {type: GraphQLString },
        email: {type: GraphQLString }
      },
      resolve(parent, args){
        console.log(args); // 
        // using args.id , execute db query to update with the updatable form data
        // update by id 
        // now sending mock resp 
        return  {
          id: args.id,
          name: args.name,
          phone: args.phone,
          email: args.email
        }
      }
    }
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

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema, // We have to set it up 
  graphiql: true, // graphiql client
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));  