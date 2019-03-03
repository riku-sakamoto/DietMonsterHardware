"use strict";

function PostWeight(name,weight){
  var targetUrl = "https://diet-monster.herokuapp.com/weights/api/"+String(name)+"?weight="+String(weight);
  fetch(targetUrl,{ method:"GET" });
};

function TweetPost(msg){
  var targetUrl = "https://diet-monster.herokuapp.com/tweets/api/"+msg;
  fetch(targetUrl,{ method:"GET" });
};

function GetScoreInfo(){
  var targetUrl = "https://diet-monster.herokuapp.com/scores/api";
  fetch(targetUrl,{
    method:"GET",
  }).then((res)=> res.json())
  .then((data)=> data);
};

function GetMonsterImage(){
  var targetUrl = "https://diet-monster.herokuapp.com/tweets/image/api";
  fetch(targetUrl,{
    method:"GET",
  }).then((res) => res.json())
  .then((data) => data);
};