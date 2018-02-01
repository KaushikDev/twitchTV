$("document").ready(function(){

$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/channels/twitch',
 headers: {
   'Client-ID': "o29zrz8i1rz3v3j24g3575lx0subtrf"   // This is the main pain in the ass.
 },
 success: function(data) {
    }
});




var following=[];
var match=0;
var jsonArr = [];
//++++++++++++++++++Data1 : For Free Code Camp Channel++++++++++++++++++++++
var fccurl="https://api.twitch.tv/kraken/streams/freecodecamp?client_id=o29zrz8i1rz3v3j24g3575lx0subtrf";
$.getJSON(fccurl, function(d1){
if(d1.stream===null){
$("#fccStatus").html("Free Code Camp channel is OFFLINE !!");
}
else{
$("#fccStatus").html("Free Code Camp channel is ONLINE !!");
$("#fccStream").html(d1.stream.game);
}
});


var followerUrl="https://api.twitch.tv/kraken/users/freecodecamp/follows/channels?client_id=o29zrz8i1rz3v3j24g3575lx0subtrf";
////d2 begins here
$.getJSON(followerUrl, function(d2){
for(var i=0;i<d2.follows.length;i++){
var displayName=d2.follows[i].channel.display_name;

following.push(displayName);
}
following.push("comster404");
following.push("brunofin");
following.push("ESL_SC2");



for(var i=0;i<following.length;i++){
var url2= "https://api.twitch.tv/kraken/streams/" + following[i] + "?client_id=o29zrz8i1rz3v3j24g3575lx0subtrf&callback=?";
$.getJSON(url2).done(function(d3){
var logo;
var status;
var name;
if(d3.error){
logo= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyptjXUkl49u841S7q9XHuW5nBBxqg_dKz1pFHxqMkf1cd24wZ";
name=d3.message;
status=d3.error;
$("#streamersInfo").prepend("<div class='row text-center' ><div class='col-xs-4' ><img src=' "+logo+" '></div><div class='col-xs-4' >"+name+"</div><div class='col-xs-4' >"+status+"</div></div>" );
jsonArr.push({Logo:logo, Name:name, Status:status});
}


if(d3.stream===null){
$.getJSON(d3._links.channel+'?client_id=o29zrz8i1rz3v3j24g3575lx0subtrf', function(d5){
status="Offline";
logo=d5.logo;
if(logo===null){
logo="https://cdn1.iconfinder.com/data/icons/ninja-things-1/720/ninja-background-512.png";
}
name=d5.display_name;

$("#streamersInfo").prepend("<div class='row text-center' ><div class='col-xs-4' ><a href='https://www.twitch.tv/" +name +  "' target='_blank' ><img src=' "+logo+" '></a></div><div class='col-xs-4' >"+name+"</div><div class='col-xs-4' >"+status+"</div></div>" );
jsonArr.push({Logo:logo, Name:name, Status:status});
});
}
});
}

for(var i=0;i<following.length;i++){
var onlineURL= "https://api.twitch.tv/kraken/streams/" + following[i] + "?client_id=o29zrz8i1rz3v3j24g3575lx0subtrf";
$.getJSON(onlineURL, function(d4){

if(d4.stream!=null){
var logo=d4.stream.channel.logo;
if(logo===null){
logo="https://cdn1.iconfinder.com/data/icons/ninja-things-1/720/ninja-background-512.png";
}
var status=d4.stream.channel.status;
var name=d4.stream.channel.display_name;
$("#streamersInfo").prepend("<div class='row text-center' ><div class='col-xs-4' ><a href='https://www.twitch.tv/" +name +  "' target='_blank' ><img src=' "+logo+" '></a></div><div class='col-xs-4' >"+name+"</div><div class='col-xs-4' >"+status+"</div></div>" );
jsonArr.push({Logo:logo, Name:name, Status:status});
}
});
}
});
//console.log(following);
console.log(jsonArr);
$("#clear").on("click", function(){
    location.reload(true);
    
  });
  

 $("#search").on("click", function(){
 match=0;
 $("#streamersInfo").html("");
 var searchedVal=$("#searchBox").val();
 searchedVal.trim();
 searchedVal.toString();
 console.log(searchedVal);
 for(var i=0;i<jsonArr.length;i++){
 
 if(jsonArr[i].Name===searchedVal){
 console.log("you have found the name");
 match+=1;
 $("#streamersInfo").prepend("<div class='row text-center' ><div class='col-xs-4' ><a href='https://www.twitch.tv/" +jsonArr[i].Name +  "' target='_blank' ><img src=' "+jsonArr[i].Logo+" '></a></div><div class='col-xs-4' >"+jsonArr[i].Name+"</div><div class='col-xs-4' >"+jsonArr[i].Status+"</div></div>" );
 
 }
 
 
 }
 if(match===0){
  //text-align: center;
  
 //$("#streamersInfo").;
 $("#streamersInfo").html("Sorry, you have entered an invalid channel name. Please retry searching !!").css({"text-align":"center", "font-size":"35px"});
 
 }
 
 }); 
  
  
});



  
  
  
