// initialize/config firebase
var config = {
    apiKey: "AIzaSyDPz8wdNX5CBCUgJtuE-xmvsswZ80D5HVg",
    authDomain: "trainscheduler-3a18b.firebaseapp.com",
    databaseURL: "https://trainscheduler-3a18b.firebaseio.com",
    projectId: "trainscheduler-3a18b",
    storageBucket: "",
    messagingSenderId: "564625421746"
};
firebase.initializeApp(config);

const database = firebase.database();
const ref = database.ref();

// create variables with initial values
var name = "";
var destination = "";
var frequency = 0;
var firstTrain = "";
// capture button click
$("#submit").on('click', function (event) {
    event.preventDefault();
// grab values from input form and assigns to variables
    let name = $("#name").val().trim();
    let destination = $("#destination").val().trim();
    let frequency = $("#frequency").val().trim();
    let firstTrain = $("#time").val().trim();
// create object for holding train data
    let newTrain = {
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };
// push values to database from newTrain
    ref.push(newTrain);
// log all values to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.firstTrain);
// clear all text from input form
$("#name").val("");
$("#destination").val("");
$("#frequency").val("");
$("#time").val("");
});

ref.on("child_added", function(snapshot) {
    console.log(snapshot.val());

    let name = snapshot.val().name;
   let destination = snapshot.val().destination;
    let frequency = snapshot.val().frequency;
    let firstTrain = snapshot.val().firstTrain;

    let timeLapse = moment(firstTrain, "HH:MM").diff(moment().format("HH:MM"), "minutes");
    console.log(timeLapse);
    let remainder = timeLapse%frequency;
    console.log(remainder);
    let minLeft = frequency - remainder;
    console.log(minLeft);
    
    // Calculate and print to dom

    $("#table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + firstTrain + "</td>" );


});