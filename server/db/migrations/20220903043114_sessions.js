/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id').primary()
    table.dateTime('start')
    table.dateTime('end')
    table.text('title')
    table.text('location')
    table.text('link')
    table.text('type')
    table.text('typeother')
    table.text('imageURL')
    table.boolean('koha')
    table.integer('cost')
    table.integer('unwagedCost')
    table.text('buyTixLink')
    table.text('inperson')
    table.text('about')
    table.text('facebook')
    table.text('instagram')
    table.text('twitter')
    table.text('contact')
    table.text('alternativeContact')
    table.text('organisation')
    table.text('extranotes')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {}
