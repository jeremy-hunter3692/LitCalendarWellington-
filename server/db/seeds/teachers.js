/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('teachers').del()
  await knex('teachers').insert([
    { id: 1, name: 'Jeremy Hunter', instrument: 'Piano' },
    { id: 2, name: 'Nick Hunter', instrument: 'Piano' },
    { id: 3, name: 'Jeannie Hunter', instrument: 'Piano' },
  ])
}
