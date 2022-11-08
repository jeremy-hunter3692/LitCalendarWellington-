/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('students').del()
  await knex('students').insert([
    { id: 3, name: 'lil jimmy', instrument: 'piano' },
    { id: 6, name: 'bleremy', instrument: 'piano' },
    { id: 16, name: 'timtimtim', instrument: 'guitar' },
    { id: 8, name: 'jimjim', instrument: 'guitar' },
  ])
}
