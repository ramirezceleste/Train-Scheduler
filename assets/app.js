
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

       name: $("#trainName").val(),
       destination: $("#destination").val(),
       firstTime: $("#firstTime").val(),
       frequency: $("#frequency").val()

    });

});

// Get data from the database 
    database.ref().on("child_added", function(snapshot) {
    var newPost = snapshot.val();
    var dbTrainName = newPost.name;
    var dbDestination = newPost.destination;
    var dbFrequency = newPost.frequency;
    var key = snapshot.key;
    // var dbNextArrival = newPost.dbNextArrival;
    // var dbMinutesAway = newPost.dbMinutesAway;
   

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

    // var frequency = $("<td>");
    // row.append(frequency);
    // firstTime.text(dbFirstTime);
    // var frequency = $("<td>");
    // row.append(frequency);
    // frequency.text(monthsWork(dbFrequency));
    // var nextArrival = $("<td>");
    // row.append(nextArrival);
    // nextArrival.text(dbMonthRate); 
    // var totalBilled = $("<td>");
    // row.append(totalBilled);
    // totalBilled.text(monthsWork(dbDate)* dbMonthRate);
    

  });


// function monthsWork(date) {
//     var dateFormat = moment(date, "YYYY-MM-DD");
//     var current = moment();
//     return current.diff(dateFormat, "months");
// }