import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQL
} from 'graphql';

const User = new GraphQLObjectType({
    name: 'user',
    fields: () => {
      return {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        firstname: { type: GraphQLString },
        secondname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      };
    }
  });

  export default User;