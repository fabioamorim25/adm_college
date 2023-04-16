import database from '../../config/database.json';

export const dialect = database.DIALECT;
export const host = database.HOST;
export const username = database.USERNAME;
export const password = database.PASSWORD;
export const database = database.DATABASE;
export const define = {
  timestamps: true,
  underscored: true
};
