const { GraphQLInt, GraphQLList } = require("graphql");
const UserType = require("../TypeDefs/User");

exports.GET_USER_BY_ID = { // Fetching one user details by Id
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
};

exports.GET_USER_LIST = {
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
};
