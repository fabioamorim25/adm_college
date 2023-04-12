import express from 'express';
import routes from './routes'
const app = express();


routes(app)



module.exports = app;