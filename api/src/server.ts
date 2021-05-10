import dotenv from 'dotenv';
import Knex from 'knex';
import { Model } from 'objection';
import app from './app';
import * as knexConfig from '../knexfile.js';

// This is a simple example server. It doesn't neither handle errors nor validate incoming data.

dotenv.config();

const PORT = process.env.PORT;

const knex = Knex(knexConfig);
Model.knex(knex);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  app.emit('ready');
});
