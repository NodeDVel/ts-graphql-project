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
    postUser(email: String, password: String, name: String): User!
    updateUser(previous_email: String, email: String, password: String, name: String): User!
    deleteUser(email: String, password: String, name: String): User!
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
        const user: User[] = await repositoy.find();

        return user;

      } catch(err) {
        console.log(err);
        new CustomError({ name: 'Database_Error' });
      }
    }
  },

  Mutation: {
    postUser: async (_ : any, { email, password, name }: {
      email: User['email'],
      password: User['password'],
      name: User['name'],
    }) => {
      const repositoy: Repository<User> = getRepository(User);

      try {
        const user: User = await repositoy.save({ email, password, name });

        return user;

      } catch(err) {
        console.log(err);
        new CustomError({ name: 'Database_Error' });
      }
    },
    updateUser: async (_: any, { previous_email, email, password, name }: {
      previous_email: User['email'],
      email: User['email'],
      password: User['password'],
      name: User['name']
    }) => {
      const repositoy: Repository<User> = getRepository(User);

      try {
        const user: User = await repositoy.findOne({ where: { previous_email }});

        if(!user) {
          new CustomError({ name: 'Database_Error' });
        }

        Object.assign(user, { email, password, name });

        await repositoy.save(user).then(val => {
          if(!val) {
            new CustomError({ name: 'Database_Error' });
          }
        });
        
        return user;

      } catch(err) {
        console.log(err);
        new CustomError({ name: 'Database_Error' });
      }

      
    },
    deleteUser: async (_: any, { email, password, name }: {
      email: User['email'],
      password: User['password'],
      name: User['name']
    }) => {
      const repositoy: Repository<User> = getRepository(User);

      try {
        const user: User = await repositoy.findOne({ where: { email, name }});

        if(!user){
          new CustomError({ name: 'Database_Error' });
        }

        if(user.password !== password) {
          new CustomError({ name: 'Wrong_Data' });
        }

        await repositoy.delete(user).then(val => {
          if(val) {
            new CustomError({ name: 'Database_Error' });
          }
        });

        return true;

      } catch(err) {
        console.log(err);
        new CustomError({ name: 'Database_Error' });
      }
    },

  }
}