 // $(document).ready(function () {

var firebaseConfig = {
    apiKey: "AIzaSyA7l_OBpsdhvzfh4IyVSzBwMNnOc8gmJ2g",
    authDomain: "parttimegigs-10b82.firebaseapp.com",
    databaseURL: "https://parttimegigs-10b82.firebaseio.com",
    projectId: "parttimegigs-10b82",
    storageBucket: "parttimegigs-10b82.appspot.com",
    messagingSenderId: "611238406430",
    appId: "1:611238406430:web:f7cfd459d83705b67d810f",
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
// center: [40.7128, -74.0060], // starting position [lng, lat]
// zoom: 3
});

// Accessing different pages using callback functions
$(document).on('click', "#listGigs",function(){
  location.href = "listJobs.html";
});
$(document).on('click', "#publishgig",function(){
  location.href = "publishGig.html";
});
$(document).on('click', "#showDashboard",function(){
  location.href = "employerDashboard.html";
});


$("#submit-employersForm").on("click", function (event) {
    // Prevent the page from refreshing
     event.preventDefault();//<-hold information

    // Get inputs
    name = $("#name-input ").val().trim();
    console.log("EMPLOY " + name);
    jobTitle = $("#jobTitle-input").val().trim();
    city = $("#city-input").val().trim();
    datepicker = $("#datefilter").val().trim();
    timePicker = $("#timefilter").val().trim()
    suggestedPrice = $("#suggestedPrice").val().trim();
    hourDaily = $("#noOfHours").val().trim();
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
        description: description,
        status: "active"
    }
    console.log(newJob);
    console.log("line works!")

    var newJobKey = database.ref("/jobDetails").push(newJob).key;
    
    setTimeout(function(){ 
      var updates = {};   
      updates["/" + newJobKey + "/status"] = "expired";
      database.ref("/jobDetails").update(updates);
      console.log("timeout");
      // database.ref("/expired/"+newJobKey).set(newJob);
      // database.ref("/jobDetails/"+newJobKey).remove();
    },3*60*60*1000);

});

$(document).on('click', ".bidButton", function () {
  $("#partTimeGigList").hide();
  $("#addABid").show();
  $("#mapDisplay").hide();
  $(document).on('click', "#btnSubmitBid", function () {
    var empName = $("#emp-name-input").val().trim();
    var bidPrice = parseInt($("#emp-hourly-rate").val().trim());
    var empEmail = $("#emp-email").val().trim();
    var empCity = $("#emp-city").val().trim();
    var jobId = $(".bidButton").attr("data-FireBaseRef");
    var newBid = {
      empName: empName,
      bidPrice: bidPrice,
      empEmail: empEmail,
      empCity: empCity,
      jobId: jobId
    }
    var newBidKey = database.ref("/bids").push(newBid).key;
    $("#partTimeGigList").show();
    $("#addABid").hide();
  });
  $(document).on('click', "#btnGoBack", function () {
    $("#partTimeGigList").show();
    $("#addABid").hide();
  });
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
    var button = $("<button type='button' class='btn btn-outline-primary bidButton'>Bid</button>").html(buttonBid);
    var newRow = $("<tr>").append(
        $("<td>").text(jobTitle),
        $("<td>").text(city),
        $("<td>").text(description),
        $("<td>").text(suggestedPrice),
        button
    );
    newRow.attr('data-address',city);
    button.attr("data-FireBaseRef", snapShot.key); //Grace, I added the key instead of ref. Also, As you can see I assigned the key to button so it can be captured easily.
    $("#partTime-table > tbody").append(newRow);
    $("#partTimeGigList").show(); //Grace, I have added show and hide buttons so we can complete bids without modals
    $("#addABid").hide();
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

if($("#map").length !== 0){
  map.on('load', function() {
console.log( document.querySelectorAll("tr[data-address]"))
  var coord1= []
  var coord2 = []
  $("tr").on("click", function () {
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
      'circle-color': '#3887BE'
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
  })
}


// Swarupa Popuri - Employer Dashboard code starts here. 
$(document).on('click', ".editGigBtn",function(){
        $("#formDiv").hide();
        $("#myGigs").hide();
        $("#editingGig").show();
        // const dbRef = firebase().database().ref;
        var jobId = $(this).attr("data-fbref");
        console.log("Job id is"+jobId);
        database.ref("/jobDetails").child(jobId).on("value", function (snapshot1) {
            $("#name-input").val(snapshot1.val().name);
            $("#jobTitle-input").val(snapshot1.val().jobTitle);
            $("#city-input").val(snapshot1.val().city);
            $("#datefilter").val(snapshot1.val().datepicker);
            $("#noOfHours").val(snapshot1.val().hourDaily);
            $("#timefilter").val(snapshot1.val().timePicker);
            $("#suggestedPrice").val(snapshot1.val().suggestedPrice);
            $("#contact-input").val(snapshot1.val().contact);
            $("#description-input").val(snapshot1.val().description);
         } );
         $(document).on("click","#update-Gig",function(){
            var updatedJobTitle = $("#jobTitle-input").val().trim();
            var updatedCity = $("#city-input").val().trim();
            var updatedDate = $("#datefilter").val().trim();
            var updatedTime = $("#timefilter").val().trim();
            var updatedPrice = $("#suggestedPrice").val().trim();
            var updatedContact = $("#contact-input").val().trim();
            var updatedDesc = $("#description-input").val().trim();
            // database.ref("/jobDetails/"+jobId).setData([jobTitle: updatedJobTitle, city: updatedCity, datepicker:updatedDate , hourDaily:updatedTime , suggestedPrice:updatedPrice , contact:updatedContact , description:updatedDesc], merge:true);
            // database.ref("/jobDetails/"+jobId).update({ jobTitle: updatedJobTitle}, {city: updatedCity},{datepicker:updatedDate},{hourDaily:updatedTime},{suggestedPrice:updatedPrice},{contact:updatedContact},{description:updatedDesc});
            database.ref("/jobDetails/"+jobId).update({ jobTitle: updatedJobTitle, city: updatedCity,datepicker:updatedDate , timePicker:updatedTime , suggestedPrice:updatedPrice,contact:updatedContact,description:updatedDesc});
            $("#myGigs").show();
            $("#editingGig").hide();
            $("#formDiv").hide()
        });
        
    });

    $(document).on("click",".viewBidsBtn", function(){
      $("#formDiv").hide();
        $("#myGigs").hide();
        $("#editingGig").hide();
        $("#viewingGig").hide();
        $("#empBidsGig").show();
        var jobId = $(this).attr("data-fbref");
        database.ref("bids").child(jobId).on("value", function (snapshot1) {
          console.log("empName is "+snapshot1.val());
        });
    });

    $(document).on('click', ".viewGigBtn",function(){
        $("#formDiv").hide();
        $("#myGigs").hide();
        $("#editingGig").hide();
        $("#viewingGig").show();
        // const dbRef = firebase().database().ref;
        var jobId = $(this).attr("data-fbref");
        console.log("Job id is"+jobId);
        database.ref("/jobDetails").child(jobId).on("value", function (snapshot1) {
            $("#view-name-input").val(snapshot1.val().name);
            $("#view-jobTitle-input").val(snapshot1.val().jobTitle);
            $("#view-city-input").val(snapshot1.val().city);
            $("#view-datefilter").val(snapshot1.val().datepicker);
            $("#view-noOfHours").val(snapshot1.val().hourDaily);
            $("#view-timefilter").val(snapshot1.val().timePicker);
            $("#view-suggestedPrice").val(snapshot1.val().suggestedPrice);
            $("#view-contact-input").val(snapshot1.val().contact);
            $("#view-description-input").val(snapshot1.val().description);
         } );
         $(document).on("click", "#btnGoBack", function(){
            $("#formDiv").hide();
            $("#myGigs").show();
            $("#editingGig").hide();
            $("#viewingGig").hide();
         });
        
    });

  
    $("#submit-checkEmployerGigs").on("click", function(event){
      event.preventDefault();
      $("#formDiv").hide();
      $("#myGigs").show();
      $("#editingGig").hide();
      var empName = $("#employerName").val().trim();
      var databaseRef = firebase.database().ref("jobDetails").orderByKey();
      console.log("Employer name is "+ empName);
      databaseRef.once("value")
      .then(function(snapshot) {
      var welcomeUser = $("<h3>").html("Welcome back " + empName);
      $("#myGigs").prepend(welcomeUser);
      snapshot.forEach(function(childSnapshot) {
          if(childSnapshot.val().name === empName){
              var key = childSnapshot.key;
              var childData = childSnapshot.val().name;
              var snapKey = childSnapshot.key;
              console.log("value is "+ childData);
              var mainGig = $("<div>");
              mainGig.attr("data-reference", snapKey);
              mainGig.addClass("card border-dark");
              var gigDiv = $("<div>");
              gigDiv.addClass("card-body");
              var gigName = $("<h5>").html(childSnapshot.val().jobTitle);
              gigName.addClass("card-title");
              var gigDesc = $("<p>").text(childSnapshot.val().description);
              gigDesc.addClass("card-text");
              var viewBidsBtn = $("<a>").html("View Bids");
              viewBidsBtn.addClass("btn btn-secondary viewBidsBtn");
              viewBidsBtn.attr("data-fbref",snapKey);
              var editGigBtn = $("<a>").html("Edit My Gig");
              editGigBtn.addClass("editGigBtn");
              editGigBtn.attr("data-fbref",snapKey);
              editGigBtn.addClass("btn btn-secondary editGigBtn");
              var viewGigBtn = $("<a>").html("View My Gig");
              viewGigBtn.attr("data-fbref",snapKey);
              viewGigBtn.addClass("btn btn-secondary viewGigBtn");
              // var deleteGigBtn = $("<a>").html("Delete Gig");
              // deleteGigBtn.attr("data-fbref",snapKey);
              // deleteGigBtn.addClass("btn btn-secondary deleteGigBtn");
              gigDiv.append(gigName);
              gigDiv.append(gigDesc);
              gigDiv.append(viewGigBtn);
              gigDiv.append(editGigBtn);
              gigDiv.append(viewBidsBtn);
              mainGig.append(gigDiv)
              $("#myGigs").append(mainGig);
        }
      });
    });
});
