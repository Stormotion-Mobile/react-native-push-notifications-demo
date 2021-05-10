import Knex from 'knex';
import { Model } from 'objection';
import app from './app';
import * as knexConfig from '../knexfile.js';
import { port } from './utils/env';

// This is a simple example server. It doesn't neither handle errors nor validate incoming data.

const knex = Knex(knexConfig);
Model.knex(knex);

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
  app.emit('ready');
});
