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

database.ref("/jobDetails").on("child_added", function(snapShot){
    var name = snapShot.val().name;
    var jobTitle = snapShot.val().jobTitle;
    var city = snapShot.val().city;
    var datePicker = snapShot.val().datePicker;
    var timePicker = snapShot.val().timePicker;
    // var requestedHoursInput = snapShot.val().requestedHours;
    var suggestedPrice = snapShot.val().suggestedPrice;
    var hourDaily = snapShot.val().hourDaily;
    var contact = snapShot.val().contact;
    var description = snapShot.val().description;
 
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(jobTitle),
        $("<td>").text(city),
        $("<td>").text(datePicker),
        $("<td>").text(timePicker),
        $("<td>").text(suggestedPrice),
        $("<td>").text( hourDaily),
        $("<td>").text(contact),
        $("<td>").text(description)
    );
      $("#bidCard").append();   
});

$("#submit-checkEmployerGigs").on("click", function(event){
    event.preventDefault();
    const databaseRef = firebase.database().ref("jobDetails");
    var empName = $("#employerEmail").val().trim();
    databaseRef.orderByChild("name").equalTo(empName).on("child_added", function(snapshot) {
        var a = snapshot.numChildren();
        console.log(a);
      });
    // console.log(empName);
    // const employerResults = databaseRef.child('jobDetails').orderByChild('name').equalTo(empName);
    // console.log(employerResults);
})