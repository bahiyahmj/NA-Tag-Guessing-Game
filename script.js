let startButton = document.getElementById("start");
let list = document.getElementById("list");
let choices = document.getElementById("choice");
let choiceButton;

// list of guesses
let library = ["Coffee", "Leaves", "Pizza", "Beach", "Cats", "Panda", "Pumpkin", "New York", "Sushi", "School", "Cookies", "Phones", "Lipstick", "Ice Cream", "Cake", "Dogs", "Running"];

let keyword;
let choicesAvailable = [];
let choiceMade;


gameStart();

// start the game
function gameStart(){
	choicesAvailable = [];
	list.innerHTML = "";
	choices.innerHTML = "";
	drawWord();
	addToArray();
	printOutChoices();
	getPic(keyword);
	
	// if correct, alert. else, restart
	for (let i = 0; i < choiceButton.length; i++){
		choiceButton[i].onclick = function(event){
			choiceMade = event.target.innerHTML;
			if (choiceMade === keyword){
				window.alert("Congrats! You're right!");
				gameStart();
			} else {
				window.alert("Sorry wrong answer. The correct answer is : " + keyword);
				gameStart();
			}
		}
	}
}

// multiple answer choice
function printOutChoices(){
	choicesAvailable.sort();
	for (let i = 0; i < choicesAvailable.length; i++){
		let button = document.createElement("button");
		button.classList.add("choiceButton");
		button.innerHTML = choicesAvailable[i];
		let choicesItem = document.createElement("li");
		choicesItem.appendChild(button);
		choices.appendChild(choicesItem);
	}
	// to have choices in a button
	choiceButton = document.getElementsByClassName("choiceButton");
}

// to get answer choices
function addToArray(){
	for (let i = 0; i < 3; i++){
		getExtra();
	}
}

// to have choice <= 4
function getExtra(){
	let extra = library[Math.floor(Math.random() * library.length)];
	if (choicesAvailable.includes(extra) === false){
		choicesAvailable.push(extra);
	} else {
		return getExtra();
	}
}

// random answer frm library
function drawWord(){
	keyword = library[Math.floor(Math.random() * library.length)];
	choicesAvailable.push(keyword);
}

// API fron tumblr
function getPic(keyword){
	
	fetch("https://api.tumblr.com/v2/tagged?tag=" + keyword + "&api_key=HWL8UzWyFcRAfjvnBwft3nHLLVBQ7iGKjeMVs0atBsbSmcHsU5").then(
		function(response){

			if (!response.ok){
				return;
			} else {
				return response.json();
			}
		}
	).then(function(json){
		if (!json){
			return;
		}

		let items = json.response;
		for (let i = 0; i < items.length; i++){
			let item = items[i];
			if (item.photos !== undefined){
				let altSize = item.photos[0].alt_sizes;
				imgSrc = altSize[altSize.length - 3].url;
				let img = document.createElement("img");
				img.src = imgSrc;
				let listItem = document.createElement("li");
				listItem.appendChild(img);
				list.appendChild(listItem);
			}
		}

	}).catch(function(error){
		console.log("try");
	});
}