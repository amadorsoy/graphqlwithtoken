import {
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import { User } from '../../models';
import ValidationError from '../../models/graphql.error';
import login from '../../../jwt';

const addUser = {
    type: User,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        firstname: { type: GraphQLString },
        secondname: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(source, args, context){ 
        let errors = [];
        let datalogin = await login({ authorization: context.request.headers.authorization, withtoken:true });
        if (datalogin.result == 'ok'){            
            args.email = args.email.toLowerCase();        
            return context.database.addNewUser(args)
                .then ( async (datos) => {
                    return await datos.dataValues;
                });
        }
        else{
            errors.push({ key: datalogin.result, message: datalogin.token });
            throw new ValidationError(errors);
        }
    }
};

export default addUser;