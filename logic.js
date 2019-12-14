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
    $("#submit-employersForm").on("click", function(event) {
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
      var newJob={
          name : name,
          jobTitle : jobTitle,
          city : city,
          datepicker : datepicker,
          timePicker : timePicker,
          suggestedPrice : suggestedPrice,
          hourDaily : hourDaily,
          contact : contact,
          description :  description
      }
      database.ref("/jobDetails").push(newJob);
      console.log(newJob);
    });
//Grace - When a user posts a new job, take snapshot of the new data added
database.ref("/jobDetails").on("child_added", function(snapShot){
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
      $("#partTime-table > tbody").append(newRow); 
});


