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
            friendDifference: 1000
        };
        console.log(req.body);

    // Get the result from the user survey.
    var surveyResults = req.body;
    var surveyScore = surveyResults.scores;

    console.log("surveyResults.scores"+ surveyResults.scores);

    // Set up variable to determine difference in scores to create match
    var difference = 0;

    // For loop - loop through each potential match in friends array
    for (var i = 0; i < friends.length; i++){
        console.log(friends[i].name);
        difference = 0;
        // Nested for loop - loop through score array
        for (var n = 0; n < friends[i].scores[n]; n++) {
            console.log("friends[i].scores[n] is: " + friends[i].scores[n]);
            difference += Math.abs(parseInt(surveyScore[n]) - parseInt(friends[i].scores[n]));
            console.log("surveyScore[n] is: " + surveyScore[n]);
            console.log("friends[i].scores[n] is: " + friends[i].scores[n]);
            console.log("difference is: " + difference);
            console.log("freindDifference is: " + match.friendDifference);

            if (difference <= match.friendDifference) {
                match.name =  friends[i].name;
                match.photo = friends[i].photo;
                match.friendDifference = difference;
            }
        }
    }

    friends.push(surveyResults);

    res.json(match);
    console.log(match);

    })

}