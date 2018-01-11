import { GraphQLObjectType } from 'graphql';

import * as QueriesUser from './queriesUser';

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () => ({
        getUser: QueriesUser.getUsers,
        getAuth: QueriesUser.getAuth 
    })
});

export default Query;