import { gql } from 'apollo-server-express';

import User from '../database/entities/User.entities';

export const typeDef = gql `
  type User {
    id: String!
    email: String!
    password: String!
    name: String!
  }

  type Query {
    user(name: String): User!
    users: [User]!
  }

  type Mutation
`;

export const resolvers = {

}