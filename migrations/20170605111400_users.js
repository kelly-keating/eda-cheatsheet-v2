
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.string('email')
    table.string('username')
    table.string('hashedPassword')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}