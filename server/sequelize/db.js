import Sequelize from 'sequelize';


const bcrypt = require("bcrypt");

const conexion = new Sequelize(
    'testsqlite3', 'testsqlite3', 'testsqlite3',
    {
      host: 'localhost',
      dialect: 'sqlite',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      storage: './server/sequelize/database/graphqlwithtoken.sqlite',
    },
  );

const User = conexion.define('user', {
        name: { type: Sequelize.STRING, allowNull: false },
        firstname: { type: Sequelize.STRING, allowNull: true },
        secondname: { type: Sequelize.STRING, allowNull: true },
        email: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: true }},
        password : { type: Sequelize.STRING, allowNull: false }
    },
    {
        indexes : [
            {
                unique: false,
                fields: ['name', 'firstname', 'secondname']
            },
            {
                unique: true,
                fields: ['email']
            },
            {
                unique: false,
                fields: ['password']
            }
        ]
    }
);

User.prototype.generateHash = async function(password){
    const resultadopassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));    
    return resultadopassword;
};

User.prototype.validPassword = async function(password, userpassword){
    const comparacion = await bcrypt.compare(password, userpassword);
    return comparacion;
};

conexion.sync({ force: true }).then(() => {        
    User.prototype.generateHash('prueba')
        .then ( (pass) => {
            User.create({
                name: 'nombre prueba',
                firstname: 'primer apellido prueba',
                secondname: 'segundo apellido prueba',
                email: 'email@prueba.com',
                password: pass
            })
                .then( (person) => {
                    console.log("Sincronizada la base de datos y creado registro.");
                });
        });    
});
  
export default conexion;