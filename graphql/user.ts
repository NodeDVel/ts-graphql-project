import { getRepository, Repository } from 'typeorm';

import { gql } from 'apollo-server-express';

import User from '../database/entities/User.entities';
import CustomError from '@Lib/customError';

export const typeDef = gql`
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

  type Mutation {
    
  }
`;

export const resolvers = {
  Query: {
    user: async (_ :any, name: { name: User['name'] }) => {
      const repositoy: Repository<User> = getRepository(User);

      try {
        const user: User = await repositoy.findOne({
          where: {
            name,
          },
        });

        if(!user) {
          new CustomError({ name: 'Database_Error' });
        }
        return user;

      } catch(err) {
        console.log(err);
      }
    },
    users: async () => {
      const repositoy: Repository<User> = getRepository(User);
      
      try {
        const user: User[] = await repositoy.find()

        return user;

      } catch(err) {
        console.log(err);
        new CustomError({ name: 'Database_Error' });
      }
    }
  }
}