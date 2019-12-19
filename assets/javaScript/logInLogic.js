
//  ============================================= VANESSA -------------- LOGIN ==================================
//  ============================================= VANESSA -------------- LOGIN ==================================
//  ============================================= VANESSA -------------- LOGIN ==================================
// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if (firebaseUser) {
//         console.log(firebaseUser);
//         user_div.classList.remove('hide');
//     } else {
//         console.log('not logged in');
//         user_div.classList.add('hide');
//     }
// });


// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
//       window.location.href = "./homePage.html"
//       // document.getElementById("user_div").style.display = 'block';
//       // document.getElementById("login_div").style.display = 'none';

//       // var user = firebase.auth().currentUser;
      
//       // if(user !=null){
//       //     var email_id = user.email;
//       //     var email_verified = user.email_verified;
//       //     document.getElementById("user_para").innerHTML = "Welcome User : " + email_id +
//       //                                                       "Verified : " + email_verified;
//       // }
//     } else {
//       // No user is signed in.
//       document.getElementById("user_div").style.display = 'none';
//       document.getElementById("login_div").style.display = 'block';
//     }
//     // login();
//   });

function login(){
    event.preventDefault();//<-hold information

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var error = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
        // ...
      });

}




function create_account(){
    var userEmail = document.getElementById("email_field").Value;
    var userPass = document.getElementById("password_field").Value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var error = error.code;
        var errorMessage = error.message;
        // ...
    

        window.alert("Error : " + errorMessage)
        // ...
      });


}



database.ref("/logIn").on("child_added", function (snapShot) {
  email = snapShot.val().email;
  password = snapShot.val().password;
  var buttonLog = snapShot.val().buttonLog;

  console.log(snapShot.val())
  var button = $("<button type=``button` id=`logIn`>Login to Account</button>").html(buttonLog);

  var loginArray = [];
  loginArray.push(snapShot.val());
  console.log(loginArray)
  
});  














// var database = firebase.database();

// $("#submit-logIn").on('click', ".button-primary",function(){
//     // Prevent the page from refreshing
//      event.preventDefault();//<-hold information
// var databaseRef = firebase.database().ref("logIn");
// database = databaseRef
//     var login = document.getElementById(`login_div`);
//     var loginButton = document.getElementById(`submit-logIn`);

//         loginButton.addEventListener(`click`, login)

//         function login() {
//             window.alert(`Working!`);
//             loginButton.classList.add(`hide`)
//             var userEmail = document.getElementById("email_field").value;
//             var userPass = document.getElementById("password_field").value;
        
//             firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
//                 // Handle Errors here.
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
                
//                 window.alert("Error : " + errorMessage);
//                 // ...
//         });
//         logIn = $("email");
//         passWord = $("password")
//     };
   
// });








