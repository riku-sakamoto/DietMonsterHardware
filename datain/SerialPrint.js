/* 0. node.jsのバージョン9以前はimportと書かない*/
const fetch = require('node-fetch');

let weight;

const SerialPort = require('serialport')
const port = new SerialPort('/dev/ttyACM0', {
  baudRate: 115200
})

// Read data that is available but keep the stream in "paused mode"
port.on('readable', function () {
  console.log('Data:', port.read())
})

// Switches the port into "flowing mode"
port.on('data', function (data) {
  console.log('Data:', data)
  weight = data;
  var name = "Diet-Person";
  var targetUrl = "https://diet-monster.herokuapp.com/weights/api/"+String(name)+"?weight="+String(weight);
  fetch(targetUrl,{ method:"GET" });
})

// Pipe the data into another stream (like a parser or standard out)
// const lineStream = port.pipe(new Readline())



/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
var express = require("express");
var app = express();

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});



app.get("/api/weight", function(req, res, next){
    res.set('Content-Type', 'text/plain');
    res.status(200).send(weight);


});
