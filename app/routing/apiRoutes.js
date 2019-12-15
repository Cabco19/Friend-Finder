// includes api routes that deliver the data from the front to the back-end and from the back to the front-end.

// LOAD DATA
var friends = require("../data/friends.js");

// ROUTING

module.exports = function (app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/tables", function(req, res) {
        var match = {
            name: "",
            photo: "",
            friendDifference: 100
        };
        console.log(req.body.name);
        console.log(req.body.scores);
    // Get the result from the user survey.
    var surveyResults = req.body;
    var surveyScore = surveyResults.scores;
    var surveyPhoto = surveyResults.photo;
    surveyPhoto = "https://picsum.photos/200";

    

    console.log(surveyResults);
    console.log("surveyResults.scores"+ surveyResults.scores);

    // Set up variable to determine difference in scores to create match
    var difference = 0;

    // For loop - loop through each potential match in friends array and calculate the difference of each set of answers. Then add all the diiferences to the variable TotalDifference to find the suitable match
    for (var i = 0; i < friends.length; i++){
        console.log(friends[i].name);
        console.log(friends[i].scores);

        
        difference = 0;

        // Nested for loop - loop through score array
        for (var n = 0; n < friends[i].scores.length; n++) {
            console.log((surveyScore[n]));
            console.log("length of friends score array " + friends[i].scores.length);
            console.log("length of survey score array " + surveyScore.length);
            // console.log("difference at start if nested loop through each freinds scores " + difference);
            console.log("Survey Score: " + surveyScore[n]);
            console.log("Friends score for "+friends[i].name+" is: "+friends[i].scores[n]);
            console.log(parseInt(surveyScore[n]));
            difference += Math.abs(parseInt(surveyScore[n]) - parseInt(friends[i].scores[n]));
            console.log("Difference is now: " + difference);
            console.log("match friendDifference is now "+ match.friendDifference);
        }
            if (difference <= match.friendDifference) {
                match.name =  friends[i].name;
                match.photo = friends[i].photo;
                match.friendDifference = difference;
                console.log(match);
            }

    }

    friends.push(surveyResults);

    res.json(match);
    console.log(match);

    })

}