export default function unpackDetails(details) {
  const { start, end } = details
  const returnDetails = { ...details }
  returnDetails.year = start.getFullYear()
  returnDetails.month = start.toLocaleString('default', {
    month: 'long',
  })

  returnDetails.date = start.getDate().toString()
  returnDetails.hour = start.getHours()
  returnDetails.minutes = start.getMinutes()
  returnDetails.endHours = end.getHours()
  returnDetails.endMinutes = end.getMinutes()

  return returnDetails
}
