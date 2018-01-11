import db from '../db';
import { user } from '../../sequelize/db';

const getAllUsers = async (args) => {
    return await db.models.user.findAll({ where: args });
}

const addNewUser = async (args) => {
    const password = await db.models.user.prototype.generateHash(args.password);
    return Promise.resolve(db.models.user.create({
        name: args.name,
        firstname: args.firstname,
        secondname: args.secondname,
        email: args.email,
        password: password
    }));    
}

export { getAllUsers, addNewUser };