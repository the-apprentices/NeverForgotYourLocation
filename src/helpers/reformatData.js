const colours = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
  '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f',
  '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400',
  '#c0392b', '#bdc3c7', '#7f8c8d']
twoNumberFormat = (numberFormat) => {
  if (numberFormat.length > 1) return numberFormat
  else return '0' + numberFormat
}

export const getAvatar = (name) => {
  let color = colours[Math.floor(Math.random() * 19)]
  let letter = name.charAt(0).toUpperCase()
  return {
    color: color,
    letter: letter
  }
}
export const formatDateTime = (timestamp) => {
  let getDateTime = new Date(timestamp)
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let month = months[getDateTime.getMonth()]
  let date = twoNumberFormat(getDateTime.getDate().toString())
  let hours = twoNumberFormat(getDateTime.getHours().toString())
  let minutes = twoNumberFormat(getDateTime.getMinutes().toString())
  return month + ' ' + date + ', ' + hours + ':' + minutes
}