/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

let start = new Date()
let end = new Date(start)
start = start.toUTCString()
end = end.toUTCString()
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert([
    {
      start: start,
      end: end,
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
    {
      start: start,
      end: end,
      title: '2Kates Event',
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
      alternativeContact: '2Person2',
      contact: '2Person1',
      organisation: '2Place1',
      extranotes: '2notes in extra notes mod',

      koha: true,
      buyTixLink: 'www.stuff2.co.nz',
      unwagedCost: '25',
    },
  ])
}
