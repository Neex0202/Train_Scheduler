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
  var firstTimeConverted = moment(firstTrain, "hh:mm");
  var trainFrequency = $("#frequency-input").val().trim();  
  var currentTime = moment().format("hh:mm");  
  var timeDif = moment().diff(moment(firstTimeConverted), "minutes");  // convert difference to minutes
  // Create new variable for timeDif in minutes if necessary
  var minsAway = timeDif % trainFrequency; //"Y" || Remainder    *timeDif must be in mins 
  var nextArrival = moment().add(minsAway, "minutes").format("hh:mm");  //"X"  in mins      *Convert to "HH:mm" 


  // Math for new Variables Specifically moment.JS conversions



  // Test Variables = working!
  console.log("Name: " + trainName);
  console.log("Destination: " + trainDestination);
  console.log("First Train: " + firstTrain);
  console.log("Frequency: " + trainFrequency);  
  console.log("Current Time: " + currentTime); //WORKING!
  console.log("Time Difference: " + timeDif); //WORKING!
  console.log("Modulus: " + minsAway); //WORKING!
  console.log("Next Arrival: " + nextArrival);  //WORKING!
 



  // Create Singular train object to hold train info

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: firstTrain,
    frequency: trainFrequency,
    currentTime: currentTime,
    minutesAway: minsAway,  // in "mmmm" 
    nextArrival: nextArrival,  // in "HH:mm"

  };


  // Test newTrain Object = working!
  console.log("New Train Object:" + newTrain);

  // Pushing newTrain info to firebase = working!
  database.ref().push(newTrain);

  // Test Database items = working!
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);
  console.log(newTrain.currentTime);
  console.log(newTrain.minutesAway);
  console.log(newTrain.nextArrival);


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
// New Variables for Calculated Variables
var currentTime = snap.val().currentTime; 
var minsAway = snap.val().minutesAway; 
var nextArrival = snap.val().nextArrival;


//Test Variables of items of child (newTrain) = working!
console.log("Fetching from firebase :");
console.log("----------------------");
console.log(trainName);
console.log(destinationName);
console.log(firstTrain);
console.log(trainFrequency);
console.log(currentTime);
console.log(minsAway);
console.log(nextArrival);
console.log("----------------------");



// Update HTML with 
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" +
  trainFrequency + "</td><td>" + nextArrival  + "</td><td>" + minsAway + "</td></tr>");





});

