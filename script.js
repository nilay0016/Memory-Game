var arr = [];
var hidden = true;
var numOfCircles = 5;
var numOfSides = 6;

function randomInRange(start,end){
       return Math.floor(Math.random() * (end - start + 1) + start);
}

function setCircles() {
	hideCircles();
	for(var i=0;i<arr.length;i++) {
		let side = $("#"+arr[i]).height();
		let displacement = side/2 - side/4;
		console.log(displacement);
		$("#"+arr[i]).find(".circle").css("top",displacement+"px");
		$("#"+arr[i]).find(".circle").css("left",displacement+"px");

		$("#"+arr[i]).find(".circle").show();
	}
	hidden = false;
}

function hideCircles() {
	$(".circle").hide();
	hidden=true;
}
function createGrid(side) { 
	var grid_id = 1;

	for(var row=0; row<side; row++){
		for( var col=0; col<side; col++) {
			$("#container").append("<div class='grid' id='"+grid_id+"'><div class='circle'></div></div>");
			grid_id++;
		}
	}
	var containerSide = $("#container").height();
	console.log(containerSide);
	$(".grid").width(containerSide/side - 4);
	$(".grid").height(containerSide/side - 4);
	$(".circle").hide();
}

function isCircleSet(clicked) {
	for( var i=0;i<arr.length;i++) {
		if(clicked == arr[i]){
			return true;
		}
	}
	return false;
}

function resetGame() {
	numOfCircles = 5;
	alert("Game Over. Try again!");
	arr = [];
	for(var i=1; i<=numOfCircles;){
		var random = randomInRange(1,numOfSides*numOfSides);
		if(arr.includes(random)) {
			continue;
		}
		arr.push(random);
		i++;
	}
	console.log(arr);
	setCircles(arr);

}

function nextLevel(){
	console.log("Next level.");
	numOfCircles+=1;
	arr = [];
	for(var i=1; i<=numOfCircles;){
		var random = randomInRange(1,36);
		if(arr.includes(random)) {
			continue;
		}
		arr.push(random);
		i++;
	}
	console.log(arr);
	setCircles(arr);
}

function progressGame(clicked) {

	console.log("Continuing...");
	if(hidden==false) {
		hideCircles();
	}
	$("#"+clicked).find(".circle").show();
	let index = arr.indexOf(clicked);
	console.log(index);
	arr.splice(index,1);
	if(arr.length==0) {
		alert("You won!");
		nextLevel();
		return arr;
	}
	console.log(arr);	
	return arr;

} 

$(document).ready(function() {
	console.log("Ready!");
	createGrid(numOfSides);
	for(var i=1; i<=numOfCircles;){
		var random = randomInRange(1,numOfSides*numOfSides);
		if(arr.includes(random)) {
			continue;
		}
		arr.push(random);
		i++;
	}
	console.log(arr);
	setCircles(arr);

	$(".grid").click(function () {
	let clicked = ($(this).attr('id'));
	clicked = parseInt(clicked);
	console.log(clicked);

	if(!isCircleSet(clicked)){
		resetGame();
	} else {
		arr = progressGame(clicked);
	}

});

});

