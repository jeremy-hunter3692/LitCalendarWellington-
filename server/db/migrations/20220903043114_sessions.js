/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('sessions', (table) => {
    table.increments('id').primary()
    table.dateTime('start')
    table.dateTime('end')
    table.text('studentNotes')
    table.text('teacherNotes')
    table.integer('teacher_id')
    table.integer('student_id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {}
