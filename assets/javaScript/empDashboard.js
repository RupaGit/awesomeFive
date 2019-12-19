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
