const accessToken = 'AIzaSyAu45A0xu8VooPpkYE_xEWOtQuUVGimqFE'

export const getAddress = async (coordinate) => {
  let url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + accessToken
    + '&latlng=' + coordinate.latitude + ',' + coordinate.longitude
  let response = await fetch(url)
  let responseJSON = await response.json()
  let placeAddress = responseJSON.results[0].formatted_address
  return placeAddress
}