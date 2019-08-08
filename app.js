const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
let db;

MongoClient.connect('mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge', (err, client) => {
    if (err) console.log(err);
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
    db.collection('Titles').find(
        {"TitleName": new RegExp(req.query.searchText)},
        { projection: { _id: 0, TitleName: 1, TitleId: 1 } } )
        .toArray(function(err, results) {
            res.send(results); 
    });
});

app.get('/oneTitle', (req, res, next) => {
    db.collection('Titles').findOne({"TitleId": parseInt(req.query.id)}, function(err, results) {
       res.send(results);
    });
});