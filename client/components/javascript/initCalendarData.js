const eventType = [
  'Book Launch',
  'Author Talk',
  'Reading',
  'Book Club',
  'Other',
]
const yearNow = new Date().getFullYear()

const initDetails = {
  month: 'January',
  date: '1',
  hour: '0',
  year: yearNow,
  start: new Date(yearNow, '0', '01', '00'),
  //this end date object is probably pointless on init
  end: new Date(yearNow, '01', '00', '01'),
  minutes: '0',
  endHours: '0',
  endMinutes: '0',
  title: '',
  type: 'Book Launch',
  link: '',
  location: '',
  imageURL: '',
  about: '',
  facebook: '',
  instagram: '',
  twitter: '',
  typeother: '',
  inperson: 'In Person',
  cost: '',
  modNotes: {},
  koha: false,
  buyTixLink: '',
  unwagedCost: '',
  // weekly: 0,
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const toBeDeleted = [
  'year',
  'date',
  'month',
  'hour',
  'minutes',
  'endMinutes',
  'endHours',
]

const hours = Array(24)
  .fill(0)
  .map((_, idx) => idx)

const minutes = Array(12)
  .fill(0)
  .map((_, idx) => idx * 5)

const daysInMonth = (month) => new Date(2023, month, 0).getDate()

const daysEachMonth = months.map((x, idx) => daysInMonth(idx + 1))

export {
  eventType,
  initDetails,
  yearNow,
  months,
  hours,
  minutes,
  daysInMonth,
  daysEachMonth,
  toBeDeleted,
}
