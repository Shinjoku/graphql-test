'use strict';

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

let id = 0;

const providers = {
   users: []
};

// Queries de consultas; utilizam os métodos
//    dos providers.
var schema = buildSchema(`
   type User {
      id: ID
      name: String
      repo: String
      age: String
   }

   type Query {
      hello: String
      user(id: ID!): User
      users: [User]
   }

   type Mutation {
      createUser(name: String!, repo: String!, age: Int!): User
   }
`);

const resolvers = {
   user({id}) {
      return providers.users
         .find(el => el.id === Number(id));
   },
   users() {
      return providers.users;
   },
   createUser({name, repo, age}) {
      const user = {
         id: id++,
         name,
         repo,
         age
      };

      providers.users.push(user);

      return user;
   }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: false,
}));

app.listen(
   3000,
    () => console.log('Now browse to localhost:3000/graphql'));