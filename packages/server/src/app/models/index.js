'use strict';

import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
const basename = _basename(__filename);
import config, { database, username, password } from '../../config/database';

const db = {};

const sequelize = new Sequelize(
  database,
  username,
  password,
  config
);


readdirSync(__dirname)
.filter(file => {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  );
})
.forEach(file => {
  const model = require(join(__dirname, file))(sequelize, DataTypes);
  db[model.name] = model;
});
  
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;


export default db;
