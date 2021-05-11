/* global ml5 writeLog */

// Define a global variable for your model's URL. Overwrite with your own.
var myModelUrl = "https://teachablemachine.withgoogle.com/models/UVlpfJzfJ/";

// Define a global variable for the classifier and the classification result
var classifier
var label = "";

// Hold the video output in a global variable
var video;

// This is a function that is called by p5.js before the rest of the page loads
function preload() {
    classifier = ml5.imageClassifier(myModelUrl + 'model.json');
    writeLog("Model loaded...");
}

// This is a function that is called by p5.js (if present) on page load
function setup() {
    writeLog("Running setup...");

    // Create a blank canvas for the webcam output
    createCanvas(320, 260);

    // Create the video
    video = createCapture(VIDEO);
    video.parent("video");
    video.size(320, 240);

    writeLog("Done setup, start classifying...")
    classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
    classifier.classify(video, gotResult);
}

function gotResult(error, results) {

    // If there is an error
    if (error) {
        writeLog(error);
        return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    var predictedLabel = results[0].label;
    var confidence = results[0].confidence;
    label = predictedLabel + " (" + confidence.toFixed(2) + ")";
    document.getElementById("label").innerHTML = label;

    var symbol = "";
    if (confidence > 0.8) {

        if (predictedLabel == "Nothing")
            symbol = "👐"
        else if (predictedLabel == "Good")
            symbol = "👍";
        else if (predictedLabel == "Bad")
            symbol = "👎";

    }
    else
        symbol = "🤷‍♀️"

    document.getElementById("labelSymbol").textContent = symbol;

    // Classifiy again!
    classifyVideo();
}