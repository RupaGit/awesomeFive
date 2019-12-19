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


  $(document).on('click', "#btnSubmitBid", function () {
    console.log("I am clicked");
    var empName = $("#emp-name-input").val().trim();
    var bidPrice = parseInt($("#emp-hourly-rate").val().trim());
    var empEmail = $("#emp-email").val().trim();
    var empCity = $("#emp-city").val().trim();
    // var jobId = $(".bidButton").attr("data-FireBaseRef");
    var newBid = {
      empName: empName,
      bidPrice: bidPrice,
      empEmail: empEmail,
      empCity: empCity
    //   jobId: jobId
    }
    var newBidKey = database.ref("/bids").push(newBid).key;
    location.href = "listJobs.html";
  
  });
  $(document).on('click', "#btnGoBack", function () {
    location.href = "listJobs.html";
  });
  