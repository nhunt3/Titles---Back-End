const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
let db;

MongoClient.connect('mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge', (err, client) => {
    if (err) {
        console.log('hello!!!' + err);
    }

    db = client.db('dev-challenge');
    app.listen(3001, function() {
        console.log('listening on 3001');
    });
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/allTitles', (req, res, next) => {
    // res.send([{TitleName: 'awesome movie'}, {TitleName: 'sucky movie'}])
    db.collection('Titles').find().toArray(function(err, results) {
        // console.log(results)
       res.send(results); 
    });
});