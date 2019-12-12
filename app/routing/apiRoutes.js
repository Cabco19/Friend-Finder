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

    // console.log("This is here: " +surveyScore);

    // Variable
    var difference = 0;

    for (var i = 0; i < friends.length; i++){
        console.log(friends[i]);
        difference = 0;

        for (var n = 0; n < friends[i].scores[n]; n++) {
            difference += Math.abs(parseInt(surveyScore[n]) - parseInt(friends[i].scores[n]));

            if (difference <= match.friendDifference) {
                match.name =  friends[i].name;
                match.photo = friends[i].photo;
            }
        }
    }

    friends.push(surveyResults);

    res.json(match);
    console.log(match);

    })

}