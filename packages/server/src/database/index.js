import {Sequelize} from 'sequelize';
import * as database from '../config/database';



const sequelize = new Sequelize({
    dialect: database.dialect,
    host: database.host,
    username: database.username,
    password: database.password,
    database: database.database,
    define: database.define
});


try {
    sequelize.authenticate();
    console.log('A conexão com o banco foi estabelecida com sucesso')
} catch (error) {
    console.log('Não foi possivel conectar com o banco de dados', error)
}

module.exports = sequelize;

