const { GraphQLInt, GraphQLString } = require("graphql");
const UserType = require("../TypeDefs/User");

exports.CREATE_USER = {
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
}

exports.UPDATE_USER = {
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