var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const user = {};
user.name = 'Yooooo';
user.age = '25';


var schema = buildSchema(`
  type Query {
    hello: String
    me: User
  }

  type User {
     id: ID
     name: String
     age: String
  }
`);

function Query_me(request) {
   return user;
}

function User_name(user) {
   return user.name;
}

var root = { hello: () => 'Hello world!' };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(
   3000,
    () => console.log('Now browse to localhost:3000/graphql'));