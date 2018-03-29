
// Link Firebase 
var config = {
    apiKey: "AIzaSyBtX2z7QF9YGbI6WXJ6-VbriiQTxhv4TME",
    authDomain: "train-scheduler-79aae.firebaseapp.com",
    databaseURL: "https://train-scheduler-79aae.firebaseio.com",
    projectId: "train-scheduler-79aae",
    storageBucket: "",
    messagingSenderId: "904557095888"
  };
  firebase.initializeApp(config);

// Reference database 
  var database = firebase.database();

// On Submit button 
$("#submitButton").on("click", function () {
   
    database.ref().push( {

       name: $("#trainName").val().trim(),
       destination: $("#destination").val().trim(),
       firstTime: $("#firstTime").val().trim(),
       frequency: $("#frequency").val().trim(),

       next: "",
       minutesAway: ""
       
    });
    
});

// Get data from the database 
    database.ref().on("child_added", function(snapshot) {
    var newPost = snapshot.val();
    var dbTrainName = newPost.name;
    var dbDestination = newPost.destination;
    var dbTrainTime = newPost.firstTime;
    var dbFrequency = newPost.frequency;
    var key = snapshot.key;

// First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(dbTrainTime, "HH:mm").subtract(1, "years");
    console.log("first time converted: " + firstTimeConverted);

// Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
    var tRemainder = diffTime % dbFrequency;

// Minute Until Train
    var tMinutesTillTrain = dbFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
   

    var row = $("<tr id='" + key + "' >");
    $(".tableBody").append(row);

    var name = $("<td>");
    row.append(name);
    name.text(dbTrainName);

    var destination = $("<td>");
    row.append(destination);
    destination.text(dbDestination);

    var frequency = $("<td>");
    row.append(frequency);
    frequency.text(dbFrequency);

    var next = $("<td>");
    row.append(next);
    next.text(moment(nextTrain).format("hh:mm A"));

    var minutesAway = $("<td>");
    row.append(minutesAway);
    minutesAway.text(tMinutesTillTrain);

  });


   



