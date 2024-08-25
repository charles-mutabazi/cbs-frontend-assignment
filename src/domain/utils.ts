/**
 * Converts an ISO string into an array containing a date string and a time string.
 *
 * @param { string } isoString - The ISO string representation of the date and time.
 * @returns { [string, string] } - An array where the first element is a date string in the format 'DD/MM/YYYY'
 *                                 and the second element is a time string in the format 'HH:MMAM/PM'.
 */
export const isoToArray = (isoString): [string, string] => {
  const date = new Date(isoString)

  // Extract date components
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Months are zero-based
  const year = date.getUTCFullYear()

  // Format time in 12-hour format with AM/PM
  const hours = date.getUTCHours()
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12 // Convert to 12-hour format

  const formattedDate = `${day}/${month}/${year}`
  const formattedTime = `${formattedHours}:${minutes}${ampm}`

  return [formattedDate, formattedTime]
}

/**
 * Converts an array containing a date string and a time string into an ISO string.
 *
 * @param { [string] } arr - An array where the first element is a date string in the format 'DD/MM/YYYY'
 *                           and the second element is a time string in the format 'HH:MM'.
 * @returns { string } - The ISO string representation of the date and time.
 */
export const arrayToIso = (arr: [string]): string => {
  try {
    // Split the date into day, month, and year
    const [day, month, year] = arr[0].split('/').map(Number)

    // Parse the time and create a date object
    const timeString: string = arr[1]
    const dateObject = new Date(`${year}-${month}-${day}T${timeString}`)

    // Convert to ISO string
    return dateObject.toISOString()
  } catch (e) {
    console.error(e)
    return ''
  }
}
