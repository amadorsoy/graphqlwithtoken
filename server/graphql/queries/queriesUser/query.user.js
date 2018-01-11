import { 
    GraphQLInt,
    GraphQLString,
    GraphQLList
} from 'graphql';

import { User } from '../../models';
import login from '../../../jwt';
import ValidationError from '../../models/graphql.error';

const getUsers = {
    type: new GraphQLList(User),
    args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        firstname: { type: GraphQLString },
        secondname: { type: GraphQLString },
        email: { type: GraphQLString }
    },
    async resolve(root, args, context) {
        let errors = [];
        let datalogin = await login({ authorization: context.request.headers.authorization, withtoken:true });
        if (datalogin.result == 'ok'){            
            return await context.database.getAllUsers(args);
        }
        else{            
            errors.push({ key: datalogin.result, message: datalogin.token });
            throw new ValidationError(errors);
        }        
    }
};

export default getUsers;