import {     
    GraphQLString,
    GraphQLList
} from 'graphql';

import { User, Auth } from '../../models';
import login from '../../../jwt';

const getAuth = {
    type: Auth,
    resolve(root, args, context) {         
        let loginresult = login({ authorization: context.request.headers.authorization, withtoken:false });
        return loginresult;                
    }
};

export default getAuth;