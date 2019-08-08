const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser');
var cors = require('cors');

let db;
const connectionString = 'mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge';
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

MongoClient.connect(connectionString, { useNewUrlParser: true }, (err, client) => {
    if (err) console.log(err);
    db = client.db('dev-challenge');
    app.listen(3001, () => {
        console.log('listening on 3001');
    });
})

app.get('/allTitles', (req, res) => {
    db.collection('Titles').find(
        {"TitleName": new RegExp(req.query.searchText, 'i')},
        { projection: { _id: 0, TitleName: 1, TitleId: 1 } } )
        .sort({"TitleName": 1})
        .toArray(function(err, results) {
            res.send(results); 
    });
});

app.get('/oneTitle', (req, res) => {
    db.collection('Titles').findOne({"TitleId": parseInt(req.query.id)}, function(err, results) {
       res.send(results);
    });
});