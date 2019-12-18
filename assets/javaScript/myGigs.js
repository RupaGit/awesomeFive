$(document).ready(function(){
var url = document.location.href
, empName = url.split('?')[1].split('=')[1];

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
var databaseRef = firebase.database().ref("jobDetails").orderByKey();


console.log(empName)

$("#formDiv").hide();
    $("#myGigs").show();
    databaseRef.once("value")
      .then(function(snapshot) {
        var welcomeUser = $("<h3>").html("Welcome back " + empName);
        $("#myGigs").prepend(welcomeUser);
        snapshot.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          // childData will be the actual contents of the child
          if(childSnapshot.val().name === empName){
            var key = childSnapshot.key;
            var childData = childSnapshot.val().name;
            console.log("Key is "+ key);
            console.log("value is "+ childData);
            var mainGig = $("<div>");
            mainGig.attr("data-reference",childSnapshot.key)
            mainGig.addClass("card border-dark");
            var gigDiv = $("<div>");
            gigDiv.addClass("card-body");
            var gigName = $("<h5>").html(childSnapshot.val().jobTitle);
            gigName.addClass("card-title");
            var gigDesc = $("<p>").text(childSnapshot.val().description);
            gigDesc.addClass("card-text");
            var newBtn = $("<button>");
            newBtn.html("I am a button");
            $("button").on("click",function () {
              console.log("Test");
            });
            // var viewBidsBtn = $("<button>").html("View Bids");
            // viewBidsBtn.addClass("btn btn-secondary");
            // viewBidsBtn.attr("id", "viewBidsBtn");
            // viewBidsBtn.attr("data-fbref", childSnapshot.key);
            // var editGigBtn = $("<button>").html("Edit My Gig");
            // // editGigBtn.attr("data-target", "#editGigModal");
            // editGigBtn.addClass("editGigBtn");
            // // editGigBtn.attr("data-fbref", childSnapshot.key);
            // // editGigBtn.attr("data-toggle", "modal");
            // editGigBtn.addClass("btn btn-secondary editGigBtn");
            // editGigBtn.onclick = function(){
            //   console.log("Test Test");
            // }
            gigDiv.append(gigName);
            gigDiv.append(gigDesc);
            gigDiv.append(newBtn);
            // gigDiv.append(viewBidsBtn);
            // gigDiv.append(editGigBtn);
            mainGig.append(gigDiv)
            $("#myGigs").append(mainGig);
          }
        });
      });
});