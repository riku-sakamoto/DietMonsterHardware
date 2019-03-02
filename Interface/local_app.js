"use strict";


$("#SampleButton").on("click", function(){
	$.ajax({
		url : "https://diet-monster.herokuapp.com/tweets/api/112",
		type : "GET",
    dataType : "json",
    timeout: 10000,
  }).done(function(data){
    console.log(data);
  }).fail(function(XMLHttpRequest, textStatus, errorThrown){
    console.log("Fail");
  });
});


// const fetch = require('node-fetch');

// var DietScore={
//   Score:100
// };

// fetch("https://diet-monster.herokuapp.com/tweets/api/100",{
//   method:"GET",
// })
// .then((response) => {
//   console.log(respose);
//   return response.text();
// })
// .then((body) => {
//     document.body.innerHTML = body;
// });





