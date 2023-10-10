/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const start = new Date()
const end = new Date(start)
end.setHours(start.getHours() + 1)

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert([
    {
      start: start.toUTCString(),
      end: end.toUTCString(),
      title: 'Kates Event',
      type: 'Reading',
      link: 'www.stuff.co.nz',
      location: 'a bookstore',
      imageURL: '',
      about: 'some words that will be in the about section',
      facebook: 'www.facebook.com',
      instagram: 'www.instagram.com',
      twitter: 'www.twitter.com',
      typeother: '',
      inperson: 'In Person',
      cost: '10',
      alternativeContact: 'Person2',
      contact: 'Person1',
      organisation: 'Place1',
      extranotes: 'notes in extra notes mod',

      koha: false,
      buyTixLink: 'www.stuff.co.nz',
      unwagedCost: '5',
    },
  ])
}
