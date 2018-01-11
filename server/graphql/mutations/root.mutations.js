import { GraphQLObjectType } from 'graphql';

import * as MutationsUser from './mutationsUser';

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    description: 'Functions to set stuff',
    fields: () => ({
        addUser: MutationsUser.addUser,        
    })
});

export default Mutation;