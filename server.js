const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors'); // npm i cors

const schema = require('./Schemas');

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema, // We have to set it up 
  graphiql: true, // graphiql client
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));  