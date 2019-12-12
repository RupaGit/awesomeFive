$(document).ready(function () {


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
    firebase.intiaizeApp(config)
 // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

// Create a variable to reference the database
var database = firebase.database();

// ------------------------------------------------------------------------------------------------
// ConnectionsRef references a specific location in our database...
// All of our connections will be stored in this directory.....................
var connectionsRef = database.ref("/connections");

// `.info/connected` is a special location provided by Firebase
// the Client's connection stage changes..........
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes.....
connectedRef.on("value", function(snap){
    // If they are connected...
    if (snap.val()){
        // Add user to the connections list...
        var con = connectedRef.push(true);
        // Remove user from the connection list when they disconnect...
        con.onDisconnect().remove()
    }
})

database.ref().set({
    name: name,
    jobTitle: jobTitle,
    city: city,
    datetimepicker: datetimepicker,
    requestedHours: requestedHours,
    price: price,
    hoursWork: hoursWork,
    contact: contact,
    description: description,
    });

// Firebase watcher + initial loader .on ("value")...
database.ref().on("value", function(snapshot){

    // Log everything that is coming out of snapshot...
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().jobTitle);
    console.log(snapshot.val().city);
    console.log(snapshot.val().dateTime);
    console.log(snapshot.val().requestedHours);
    console.log(snapshot.val().price);
    console.log(snapshot.val().hoursWork);
    console.log(snapshot.val().contact);
    console.log(snapshot.val().description);

// Change the HTML to refelect 
$(`#name-input`).text(snapshot.val().name)
$(`#jobTitle-input`).text(snapshot.val().jobTitle)
$(`#city-input`).text(snapshot.val().city);
$(`#datetimepicker`).text(snapshot.val().dateTime);
$(`#requestedHours-input`).text(snapshot.val().requestedHours);
(`#price-input`).text(snapshot.val().price);
$(`#hourlyDaily-input`).text(snapshot.val().hoursWork);
$(`#contact-input`).text(snapshot.val().contact);
$(`#description-input`).text(snapshot.val().description);


}, function(errorObject){
    console.log("Errors handled: " + errorObject.code);
});

// =========================================================================

// Whenever a user clicks the submit-button...........

$(`#submit-employersForm`).on("click", function(event){
    event.preventDefault();
    // Get the input values.......
    var name = $(`#name-input`).val().trim();
    var jobTitle = $(`#jobTitle-input`).val().trim();
    var city = $(`#city-input`).val().trim();
    var dateTime = $(`#datetimepicker`).val().trim();
    var requestedHours = $(`#requestedHours-input`).val().trim();
    var price = $(`#price-input`).val().trim();
    var hoursWork = $(`#hourlyDaily-input`).val().trim();
    var contact = $(`#contact-input`).val().trim();
    var description = $(`#description-input`).val().trim();

    // Log Employer's Job Description.....
    console.log(name);
    console.log(jobTitle);
    console.log(city);
    console.log(dateTime);
    console.log(requestedHours);
    console.log(price);
    console.log(hoursWork);
    console.log(contact);
    console.log(description);
})

$('input[name="dates"]').daterangepicker();
$(function() {
    $('input[name="datefilter"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });
    $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });
  
  });

});


