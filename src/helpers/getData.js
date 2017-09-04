const accessToken = 'AIzaSyAu45A0xu8VooPpkYE_xEWOtQuUVGimqFE'
const placeType = 'accounting,airport,amusement_park,aquarium,art_gallery,atm,bakery,bank,bar,beauty_salon,bicycle_store,book_store,bowling_alley,bus_station,cafe,campground,car_dealer,car_rental,car_repair,car_wash,casino,cemetery,church,city_hall,clothing_store,convenience_store,courthouse,dentist,department_store,doctor,electrician,electronics_store,embassy,fire_station,florist,funeral_home,furniture_store,gas_station,gym,hair_care,hardware_store,hindu_temple,home_goods_store,hospital,insurance_agency,jewelry_store,laundry,lawyer,library,liquor_store,local_government_office,locksmith,lodging,meal_delivery,meal_takeaway,mosque,movie_rental,movie_theater,moving_company,museum,night_club,painter,park,parking,pet_store,pharmacy,physiotherapist,plumber,police,post_office,real_estate_agency,restaurant,roofing_contractor,rv_park,school,shoe_store,shopping_mall,spa,stadium,storage,store,subway_station,synagogue,taxi_stand,train_station,transit_station,travel_agency,university,veterinary_care,zoo'
export const getAddress = async (coordinate) => {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + accessToken
    + '&latlng=' + coordinate.latitude + ',' + coordinate.longitude
  let response = await fetch(url)
  let responseJSON = await response.json()
  let listPlaceAddress = []
  responseJSON.results.forEach((result) => {
    listPlaceAddress.push(result.formatted_address)
  })
  return listPlaceAddress
}
export const getPlaceName = async (coordinate) => {
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
    + coordinate.latitude + ',' + coordinate.longitude + '&radius=50&type=' + placeType
    + '&key=' + accessToken
  let response = await fetch(url)
  let responseJSON = await response.json()
  let listPlaceName = []
  responseJSON.results.forEach((result) => {
    listPlaceName.push(result.name)
  })
  return listPlaceName
}