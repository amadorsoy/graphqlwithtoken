import { GraphQLSchema } from 'graphql';

import Query from './queries/root.queries';
import Mutation from './mutations/root.mutations';

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default schema;
