exports.up = knex => {
  knex.schema.hasTable('Article').then(exists => {
    if (exists) {
      return;
    }

    return knex.schema.createTable('Article', table => {
      table.string('id').primary();

      table.text('title').notNullable();
      table.text('content').notNullable();
      table.text('shortContent').notNullable();

      table.text('cover');
    });
  });

  knex.schema.hasTable('DeviceToken').then(exists => {
    if (exists) {
      return;
    }

    return knex.schema.createTable('DeviceToken', table => {
      table.string('id').primary();

      table.text('token').notNullable();
      table.text('deviceId').notNullable();
    });
  });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('Article')
    .dropTableIfExists('DeviceToken');
};
