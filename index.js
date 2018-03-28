var parser = require('node-whatsapp-parser');
var analyze = require('Sentimental').analyze,
    positivity = require('Sentimental').positivity,
    negativity = require('Sentimental').negativity;
var http = require('http');

var person1 = "Koustubh";
var person2 = "Tanmayi";


var scorePerson1Postive = 0;
var scorePerson1Negative = 0;
var scorePerson1Aggregate = 0;

var scorePerson2Postive = 0;
var scorePerson2Negative = 0;
var scorePerson2Aggregate = 0;

var filepath = 'whatsapp-chat-archive.txt';

var callback = (result) =>
{
    console.log(result);
    http.createServer(function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.write(JSON.stringify(result)); //write a response to the client
        res.end(); //end the response
    }).listen(8082);
}



    parser
        .parseFile(filepath)
        .then((messages) => {

        for(message in messages
)
    {

        switch (messages[message]['author']) {

            case person1:
            {
                scorePerson1Postive += positivity(messages[message]['content']).score;
                scorePerson1Negative += negativity(messages[message]['content']).score;
                scorePerson1Aggregate += analyze(messages[message]['content']).score;
                break;
            }
            case person2:
            {
                scorePerson2Postive += positivity(messages[message]['content']).score;
                scorePerson2Negative += negativity(messages[message]['content']).score;
                scorePerson2Aggregate += analyze(messages[message]['content']).score;
                break;
            }
        }

    }


    var result = {
        "person1": {
            "positive": scorePerson1Postive,
            "negative": scorePerson1Negative,
            "aggregate": scorePerson1Aggregate
        },
        "person2": {
            "positive": scorePerson2Postive,
            "negative": scorePerson2Negative,
            "aggregate": scorePerson2Aggregate
        }
    };

    callback(result);

});






