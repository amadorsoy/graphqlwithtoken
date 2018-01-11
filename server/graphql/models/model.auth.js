import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQL,
} from 'graphql';

const Auth = new GraphQLObjectType({
    name: 'auth',
    fields: () => {
      return {
        result: { type: GraphQLString },
        expiration: { type: GraphQLInt },
        token: { type: GraphQLString }        
      };
    }
  });

  export default Auth;