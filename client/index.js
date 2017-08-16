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

// buildMarker('hotels', [-74.009, 40.705]).addTo(map);

var types = ['hotels', 'restaurants', 'activities'];
var state = [];

fetch("/api")
.then(response => response.json())
.then(data => {
  types.forEach(function(type){
    var parent = document.getElementById(`${type}-choices`);
    var poi = data[type];
    poi.forEach(function(obj){
      var option = document.createElement('option');
      option.value = obj.id
      option.append(obj.name)
      parent.append(option);
    })
  });
})
.catch(console.error);

types.forEach(function(type){
  document.getElementById(`${type}-add`).addEventListener("click", () => {
    fetch("/api/")
      .then(response => response.json())
      .then(data => {

        //finding the restaurantId
        var Id = document.getElementById(`${type}-choices`).value

        //matching the highlighted restaurant to the restaurants in the array with matching value
        var selected = {};
        data[type].forEach(function (obj) {
          if (obj.id.toString() === Id) {
            selected = obj;
          }
        })

        if (state.indexOf(selected.placeId) === -1) {
          state.push(selected.placeId);
          //appending it to the list below
          var listedItem = document.createElement('li')
          listedItem.append(selected.name)

          //create the X button to the hotel so we can remove
          var removeButton = document.createElement('button')
          removeButton.className = 'btn btn-danger btn-circle pull-right'
          removeButton.append('x')
          removeButton.addEventListener('click', () => {
            removeButton.parentNode.parentNode.removeChild(removeButton.parentNode);
            marker.remove();
            state.splice(state.indexOf(selected.placeId), 1);
          })
          listedItem.append(removeButton)
          //setting up to add the selected hotel to the itinerary
          var list = document.getElementById(`${type}-list`)
          //appending it to the list
          list.append(listedItem)
          //setting up to add the hotel marker to the map
          var location;
          data.places.forEach(function (place) {
            if (place.id === selected.placeId) {
              location = place.location
            }
          })
          var marker = buildMarker(`${type}`, location).addTo(map);

          map.flyTo({
            center: location,
            speed: 0.2,
          })
          }
      })
      .catch(console.error);
  });
})

