var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var express = require('express');
var bodyParse = require('body-parser');
var app = express();
var num1, num2, mul_result;

app.use(bodyParse.json());
app.use(express.static(__dirname + "/"));

app.post('/saveData', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("caldb");
    var number1 = req.body.firstnumber;
    var number2 = req.body.secondnumber;
    var multiply = number1 * number2;
    var myobj = { Number_1: number1, Number_2: number2, Result: multiply };
    console.log(myobj);
    dbo.collection("multiplydb").insertOne(myobj, function (err, result) {
      if (err) throw err;
      console.log("1 document inserted");
      console.log(result.insertedCount);
      db.close();
    });
  });
  res.end();
});

app.get('/getData', (req, resp) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("caldb");
    var coll = dbo.collection('multiplydb');
    coll.count().then((count) => {
      console.log(count);
      coll.find({}).toArray(function (err, res) {
        if (err) throw err;
        num1 = res[count - 1].Number_1;
        num2 = res[count - 1].Number_2;
        mul_result = res[count - 1].Result;
        inserttext = "Number_1 = " + num1 + "   Number_2 = " + num2 + "   Product : " + mul_result;
        console.log(inserttext);
        response = { number11: num1, number22: num2, product12: mul_result };
        resp.send(JSON.stringify(response));
        console.log(" sent response as : " + response.number11 + " " + response.number22 + " " + response.product12);
      });
    });
  });
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log("Litening at Port :" + port);
});
