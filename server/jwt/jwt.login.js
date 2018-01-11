import * as jwt from 'jwt-simple';
import db from '../sequelize/db';
import { secret, expiration } from '../jwt-conf';

const login = async (args) => {
    if (args.authorization){        
        let tempdata = args.authorization.split(' ');
        let bufferpassed = new Buffer(tempdata[1], 'base64');                   
        let datapassed = bufferpassed.toString();
        let datapassedarray = datapassed.split(':');
        let tokenpassed = datapassedarray[0];        
        let resultdecode;
        try{
            resultdecode = jwt.decode(tokenpassed, secret, 'HS512');
        }
        catch(err){            
            resultdecode = undefined;
        }        
        if (resultdecode){
            let date = new Date(resultdecode.datetoken);
            let datenow = new Date();
            let secondsdiff = Math.abs((datenow.getTime() - date.getTime()) / 1000);            
            if (secondsdiff > resultdecode.expiration){
                let datos = await db.models.user.findOne({ where: { email: resultdecode.email} });
                if (!datos){
                    return { result:"notfound", token:"The user not exists in database"  };
                }
                else{
                    let validado = await db.models.user.prototype.validPassword(resultdecode.password, datos.password);
                    if (validado == false){
                        return { result:"error", token:"The password is not valid" };
                    }
                    else{
                        let playload = { email: datos.email, password: datos.password, id: datos.id, expiration: 3600, datetoken: new Date() };    
                        let token = jwt.encode( playload, secret, 'HS512' );    
                        return { result: "ok", token: token };
                    }
                }    
            }
            else{
                return { result: "ok", token:tokenpassed };
            }            
        }else{        
            if (args.withtoken == false){
                let email = datapassedarray[0];
                let pass = datapassedarray[1];
                let datos = await db.models.user.findOne({ where: { email: email} });
                if (!datos){
                    return { result:"notfound", token:"The user not exists in database"  };
                }
                else{
                    let validado = await db.models.user.prototype.validPassword(pass, datos.password);
                    if (validado == false){
                        return { result:"error", token:"The password is not valid" };
                    }
                    else{
                        let playload = { email: datos.email, password: pass, id: datos.id, expiration: 3600, datetoken: new Date() };    
                        let token = jwt.encode( playload, secret, 'HS512' );    
                        return { result: "ok", token: token };                    
                    }
                }
            }
            else{
                return { result: "notoken", token:"We need a token to work, you can get a token with the data with getAuth query." };        
            }
        }        
    }
    else{
        return { result: "required", token:"We need a login to work." };
    }
    
}

export default login;
