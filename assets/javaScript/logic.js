// $(document).ready(function () {
var firebaseConfig = {
    apiKey: "AIzaSyA7l_OBpsdhvzfh4IyVSzBwMNnOc8gmJ2g",
    authDomain: "parttimegigs-10b82.firebaseapp.com",
    databaseURL: "https://parttimegigs-10b82.firebaseio.com",
    projectId: "parttimegigs-10b82",
    storageBucket: "parttimegigs-10b82.appspot.com",
    messagingSenderId: "611238406430",
    appId: "1:611238406430:web:f7cfd459d83705b67d810f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Create a variable to reference the database
var database = firebase.database();
// Initial Variables (SET the first set IN FIREBASE FIRST)
// Note remember to create these same variables in Firebase!


// Click Button changes what is stored in firebase
//guy's code

$('#map').hide();
mapboxgl.accessToken ='pk.eyJ1IjoiZ3V5eWFmZmVhciIsImEiOiJjazQ2NDZucnUwZ2F6M2VuNjI3cDliZXl6In0.plk0zq29BJttq6ylX-85bA';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-74.5, 40], // starting position [lng, lat]
zoom: 9
}); 



$("#submit-employersForm").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get inputs
    name = $("#name-input ").val().trim();
    console.log("EMPLOY " + name);
    jobTitle = $("#jobTitle-input").val().trim();
    city = $("#city-input").val().trim();
    datepicker = $("#datefilter").val().trim();
    timePicker = $("#timefilter").val().trim()
    suggestedPrice = $("#suggestedPrice").val().trim();
    hourDaily = $("#hourlyDaily-input").val().trim();
    contact = $("#contact-input").val().trim();
    description = $("#description-input").val().trim();
    // Change what is saved in firebase
    var newJob = {
        name: name,
        jobTitle: jobTitle,
        city: city,
        datepicker: datepicker,
        timePicker: timePicker,
        suggestedPrice: suggestedPrice,
        hourDaily: hourDaily,
        contact: contact,
        description: description
    }
    database.ref("/jobDetails").push(newJob);
    console.log(newJob);
});
//Grace - When a user posts a new job, take snapshot of the new data added
database.ref("/jobDetails").on("child_added", function (snapShot) {
    var jobTitle = snapShot.val().jobTitle;
    var city = snapShot.val().city;
    var description = snapShot.val().description;
    // var requestedHoursInput = snapShot.val().requestedHours;
    var suggestedPrice = snapShot.val().suggestedPrice;
    var buttonBid = snapShot.val().buttonBid;

    console.log(snapShot.val())
    var newRow = $("<tr>").append(
        $("<td>").text(jobTitle),
        $("<td>").text(city),
        $("<td>").text(description),
        $("<td>").text(suggestedPrice),
        $("<button type='button' id='bidButton' class='btn btn-outline-primary'>Bid</button>").html(buttonBid)
    );
    newRow.attr('data-address',city);
    newRow.attr('id',city);
    $("#partTime-table > tbody").append(newRow);
    
});  

// set the bounds of the map
// var bounds = [[-73.988154, 40.719929],[-73.9893433, 40.7426854]];
// map.setMaxBounds(bounds);

// an arbitrary start will always be the same
// only the end or destination will change
// var start = [-122.662323, 45.523751];

// create a function to make a directions request
function getRoute(start, end) {
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  // var start = [-122.662323, 45.523751];
  var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

  // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
  var req = new XMLHttpRequest();
  req.responseType = 'json';
  req.open('GET', url, true);
  req.onload = function() {
    var data = req.response.routes[0];
    var route = data.geometry.coordinates;
    var geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    };
    // if the route already exists on the map, reset it using setData
    if (map.getSource('route')) {
      map.getSource('route').setData(geojson);
    } else { // otherwise, make a new request
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: geojson
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
    // add turn instructions here at the end
  };
  req.send();
}

map.on('load', function() {

  var coord1= []
  var coord2 = []

  $("tr[data-address]").on("click", function () {
    $('#map').show();
    var address = $(this).attr("data-address")
    console.log("HOOOOYAAAA",address);
    var address1 = encodeURI(address)
    var queryURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address1+".json?bbox=-171.791110603,18.91619,-66.96466,71.3577635769&access_token=pk.eyJ1IjoiZ3V5eWFmZmVhciIsImEiOiJjazQ2NDZucnUwZ2F6M2VuNjI3cDliZXl6In0.plk0zq29BJttq6ylX-85bA";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.features[0].center[0];
        var results2 = response.features[0].center[1];
        coord1.push(results,results2);
        console.log("i hate aPI ",coord1);
        address2 = "Flushing,NY 11367" ;
        address3 = encodeURI(address2)
        var queryURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address3+".json?bbox=-171.791110603,18.91619,-66.96466,71.3577635769&access_token=pk.eyJ1IjoiZ3V5eWFmZmVhciIsImEiOiJjazQ2NDZucnUwZ2F6M2VuNjI3cDliZXl6In0.plk0zq29BJttq6ylX-85bA";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.features[0].center[0];
            var results2 = response.features[0].center[1];
            coord2.push(results,results2);
            console.log("i hate aPI ",coord2);
        })
    })
   

    setTimeout(function() {
      getCompleteRoute(coord1,coord2)
    }, 3000);
  });


function getCompleteRoute(start,end) {
  console.log('start',start, 'end',end)
  
  // add start point
  map.addLayer({
    id: 'point',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: start
          }
        }
        ]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#3887be'
    }
  });

  // add end point
  map.addLayer({
    id: 'end',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: end
          }
        }]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#f30'
    }
  });


  getRoute(start, end);
  }
});
$("#submit-checkEmployerGigs").on("click", function(event){
    event.preventDefault();
    const databaseRef = firebase.database().ref("jobDetails");
    var empName = $("#employerEmail").val().trim();
    $("#formDiv").hide();
    $("#myGigs").show();
    var welcomeUser = $("<h3>").html("Welcome back "+empName);
    databaseRef.orderByChild("name").equalTo(empName).on("child_added", function(snapshot) {
        var gigsArray = [];
        gigsArray.push(snapshot.val());
        console.log(gigsArray);
        $("#myGigs").prepend(welcomeUser);
        for (var i=0; i<gigsArray.length; i++) {
            var mainGig = $("<div>");
            mainGig.addClass("card border-dark");
            var gigDiv = $("<div>");
            gigDiv.addClass("card-body");
            var gigName = $("<h5>").html(gigsArray[i].jobTitle);
            gigName.addClass("card-title");
            var gigDesc = $("<p>").text(gigsArray[i].description);
            gigDesc.addClass("card-text");
            var viewBidsBtn = $("<a>").html("View Bids");
            viewBidsBtn.addClass("btn btn-secondary");
            viewBidsBtn.attr("id", "viewBidsBtn");
            gigDiv.append(gigName);
            gigDiv.append(gigDesc);
            gigDiv.append(viewBidsBtn);
            mainGig.append(gigDiv)
            $("#myGigs").append(mainGig);
        }
      });  
})
