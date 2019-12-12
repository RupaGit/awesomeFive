$("#submit").on("Click", function (event) {
    var jobCat = $("jobDesc").val().trim();
    var dateWorking = $("date").val().trim();
    var timeWork = $("time").val().trim();


}
)
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