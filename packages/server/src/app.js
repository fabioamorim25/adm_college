import express from 'express';
import routes from './app/routes'
const app = express();


routes(app)



module.exports = app;