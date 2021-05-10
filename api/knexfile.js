module.exports = {
  client: 'postgresql',
  connection: {
    database: 'pushnotifications-db',
    user: 'user',
    password: 'password',
  },
  pool: {
    min: 2,
    max: 10,
  },
  debug: true,
};
