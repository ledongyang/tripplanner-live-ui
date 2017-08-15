const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker");


// /*
//  * Instantiate the Map
//  */

mapboxgl.accessToken = "pk.eyJ1Ijoic3Vuamlua2FuZyIsImEiOiJjajY4Mzl3d24wY25hMnFvbGxkNHA0YXcxIn0.j-z7B8rZKHZs831HOpRO_Q";


const map = new mapboxgl.Map({
  container: "map-canvas",
  center: [-74.0, 40.731],
  zoom: 12.5, // starting zoom
  pitch: 35,
  bearing: 20,
  style: "mapbox://styles/mapbox/light-v9"
});

buildMarker('hotels', [-74.009, 40.705]).addTo(map);

// fetch('/api')
// .then(result => result.json())
// .then(data => console.log(data))
// .catch(console.error)




fetch("/api")
  .then(response => response.json())

  .then(data => {

    var hotels = data.hotels
    var restaurants = data.restaurants
    var activities = data.activities


    var hotelParent = document.getElementById('hotels-choices')
    hotels.forEach(function (hotel) {
      var hotelOption = document.createElement('option')
      hotelOption.value = hotel.id
      hotelOption.append(hotel.name)
      hotelParent.append(hotelOption)
    })
    var restaurantParent = document.getElementById('restaurants-choices')
    restaurants.forEach(function (restaurant) {
      var restaurantOption = document.createElement('option')
      restaurantOption.value = restaurant.id
      restaurantOption.append(restaurant.name)
      restaurantParent.append(restaurantOption)
    })

    var activityParent = document.getElementById('activities-choices')
    activities.forEach(function (activity) {
      var activityOption = document.createElement('option')
      activityOption.value = activity.id
      activityOption.append(activity.name)
      activityParent.append(activityOption)
    })
  })
  .catch(console.error)



document.getElementById("hotels-add").addEventListener("click", () => {
  fetch("/api/")
    .then(response => response.json())
    .then(data => {



      //finding the restaurantId
      var hotelId = document.getElementById('hotels-choices').value

      //matching the highlighted restaurant to the restaurants in the array with matching value
      var selectedHotel = {};
      data.hotels.forEach(function (hotel) {
        if (hotel.id.toString() === hotelId) {
          selectedHotel = hotel
        }
      })
      //appending it to the list below
      var listedHotel = document.createElement('li')
      listedHotel.append(selectedHotel.name)

      //create the X button to the hotel so we can remove
      var removeButton = document.createElement('button')
      removeButton.className = 'btn btn-danger btn-circle pull-right'
      removeButton.append('x')
      removeButton.addEventListener('click', () => {
        removeButton.parentNode.parentNode.removeChild(removeButton.parentNode)

        hotelMarker.remove()

      })

      listedHotel.append(removeButton)

      //setting up to add the selected hotel to the itinerary
      var hotelList = document.getElementById('hotels-list')

      //appending it to the list
      hotelList.append(listedHotel)
      //setting up to add the hotel marker to the map
      var hotelLocation;
      data.places.forEach(function (place) {
        if (place.id === selectedHotel.placeId) {
          hotelLocation = place.location
        }
      })


      var hotelMarker = buildMarker('hotels', hotelLocation).addTo(map)


      map.flyTo({
        center: hotelLocation,
        speed: 0.2,
      })
    })
    .catch(console.error);
});


document.getElementById("restaurants-add").addEventListener("click", () => {
  fetch("/api/")
    .then(response => response.json())
    .then(data => {
      //finding the hotelid
      var restaurantId = document.getElementById('restaurants-choices').value

      //matching the highlighted hotel to the hotels to the array with matching value
      var selectedRestaurant = {};
      data.restaurants.forEach(function (restaurant) {
        if (restaurant.id.toString() === restaurantId) {
          selectedRestaurant = restaurant
        }
      })
      //appending it to the list below
      var listedRestaurant = document.createElement('li')
      listedRestaurant.append(selectedRestaurant.name)

      //create the X button to the hotel so we can remove
      var removeButton = document.createElement('button')
      removeButton.className = 'btn btn-danger btn-circle pull-right'
      removeButton.append('x')
      removeButton.addEventListener('click', () => {
        removeButton.parentNode.parentNode.removeChild(removeButton.parentNode)

        restaurantMarker.remove()
      })

      listedRestaurant.append(removeButton)

      //setting up to add the selected hotel to the itinerary
      var restaurantList = document.getElementById('restaurants-list')

      //appending it to the list
      restaurantList.append(listedRestaurant)
      //setting up to add the restaurant marker to the map
      var restaurantLocation;
      data.places.forEach(function (place) {
        if (place.id === selectedRestaurant.placeId) {
          restaurantLocation = place.location
        }
      })


      var restaurantMarker = buildMarker('restaurants', restaurantLocation).addTo(map)

      map.flyTo({
        center: restaurantLocation,
        speed: 0.2,
      })
    })
    .catch(console.error);
});







document.getElementById("activities-add").addEventListener("click", () => {
  fetch("/api/")
    .then(response => response.json())
    .then(data => {
      //finding the hotelid
      var activityId = document.getElementById('activities-choices').value

      //matching the highlighted hotel to the hotels to the array with matching value
      var selectedActivity = {};
      data.activities.forEach(function (activity) {
        if (activity.id.toString() === activityId) {
          selectedActivity = activity
        }
      })
      //appending it to the list below
      var listedActivity = document.createElement('li')
      listedActivity.append(selectedActivity.name)

      //create the X button to the hotel so we can remove
      var removeButton = document.createElement('button')
      removeButton.className = 'btn btn-danger btn-circle pull-right'
      removeButton.append('x')
      removeButton.addEventListener('click', () => {
        removeButton.parentNode.parentNode.removeChild(removeButton.parentNode)

        activityMarker.remove()
      })

      listedActivity.append(removeButton)

      //setting up to add the selected hotel to the itinerary
      var activityList = document.getElementById('activities-list')

      //appending it to the list
      activityList.append(listedActivity)
      //setting up to add the hotel marker to the map
      var activityLocation;
      data.places.forEach(function (place) {
        if (place.id === selectedActivity.placeId) {
          activityLocation = place.location
        }
      })


      var activityMarker = buildMarker('activities', activityLocation).addTo(map)

      map.flyTo({
        center: activityLocation,
        speed: 0.2,
      })
    })
    .catch(console.error);
});
