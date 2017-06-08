  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyD8BubRlV5TLEOk_tHdE_vFAqITOtlk8so",
      authDomain: "train-scheduler-427da.firebaseapp.com",
      databaseURL: "https://train-scheduler-427da.firebaseio.com",
      projectId: "train-scheduler-427da",
      storageBucket: "train-scheduler-427da.appspot.com",
      messagingSenderId: "768030260044"
  };

  firebase.initializeApp(config);


var database = firebase.database();

$("#add-train").on("click", function() {
  event.preventDefault();

  // Define Variables
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");
  var trainFrequency = $("#frequency-input").val().trim();

  // Test Variables = working!
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrain);
  console.log(trainFrequency);

  // Create Singular train object to hold train info

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: firstTrain,
    frequency: trainFrequency

  };

  // Test newTrain Object = working!
  console.log(newTrain);

  // Pushing newTrain info to firebase = working!
  database.ref().push(newTrain);

// Test Database items = working!
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

// Clear Input Forms
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

});

// Firebase watcher for generation of newTrain(child) & update HTML Table

database.ref().on("child_added", function(snap){

// Test fetch of new child from firebase
console.log(snap.val());

// Define variables for items of child (newTrain)
var trainName = snap.val().name;
var destinationName = snap.val().destination;
var firstTrain = snap.val().start;
var trainFrequency = snap.val().frequency;


//Test Variables of items of child (newTrain) = working!
console.log(trainName);
console.log(destinationName);
console.log(firstTrain);
console.log(trainFrequency);


// Update HTML with 
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" +
  trainFrequency + "</td><td>" + "CALCULATE!" + firstTrain + "</td><td>" + "CALCULATE!" + "</td></tr>");







});

