var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var fs = require('fs');
var express = require('express');
const bodyParse = require('body-parser');
var app = express();
app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/"));

app.get('/AngularApp.html', function (req, res) {
  res.sendFile("C:/nodejs/CALCULATOR/AngularApp.html");
});

app.get('/AngularApp', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("caldb");
    var number1 = req.query.firstnumber;
    var number2 = req.query.secondnumber;
    var multiply = number1 * number2;
    var myobj = { Number_1: number1, Number_2: number2, Result: multiply };
    dbo.collection("multiplydb").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      console.log(res.insertedCount);
      var inserttext = "Number_1 = " + myobj.Number_1 + " Number_2 = " + myobj.Number_2 + " Product : " + myobj.Result;
      fs.writeFile('last_db_record.txt', inserttext, function (err) {
        if (err) throw err;
        console.log('Replaced!');
      });
      db.close();
    });
  });
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log("Litening at Port :" + port);
});