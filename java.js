
// // query form
// const form = document.getElementById('query-form');

// // text input field
// const query = document.getElementById('query');



const tags = ['cendol', 'malaysia', 'singapore', 'city'];
const list = document.getElementById('list-data');
const answerList = document.getElementById('choices');
let answer = ""

function randomColor(){
	const r = Math.floor(Math.random() * 255);
	const g = Math.floor(Math.random() * 255);
	const b = Math.floor(Math.random() * 255);
	return 'rgb(' + r + ',' + g + ',' + b + ')'
}

function reset(){
	answerList.innerHTML="";
	answer = tags[Math.floor(Math.random() * tags.length)];
	getTaggedPhotos(answer);

	const choices = [];
	choices.push(answer);

	while (choices.length < 4){
		const rand = tags[Math.floor(Math.random() * tags.length)];
		if (choices.indexOf(rand) == -1){
			choices.push(rand);
		}
	}

	choices.sort(function(){
		return Math.random() * 2 - 1;
	});

	for (let i = 0; i < choices.length; i++){
		const li = document.createElement('li');
		const btn = document.createElement('button');
		li.appendChild(btn)
		btn.innerHTML = choices[i]
		btn.style.backgroundColor = randomColor();
		btn.onclick = function(){
			if (btn.innerHTML == answer){
				window.alert('You are right!')
			} else {
				window.alert('Sorry! the answer is ' + answer)
			}
			reset();
		}
		answerList.appendChild(li);
	}
}

// // set onsubmit
// form.onsubmit = function(event){
// 	event.preventDefault();

// 	// get value in input field
// 	const queryTerm = query.value;
// 	console.log(queryTerm);

// 	getTaggedPhotos(queryTerm);
// }

function getTaggedPhotos(tagName) {

	fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=HWL8UzWyFcRAfjvnBwft3nHLLVBQ7iGKjeMVs0atBsbSmcHsU5')
		.then(function(response){
		return response.json();
		})
		.then(function(result){

			// clear list
			list.innerHTML ='';

			const items = result.response;

			for(let i = 0; i < items.length; i++){
				const item = items[i];

				if (item.photos != undefined) {

				const altSizes = item.photos[0].alt_sizes;
				const imgSrc = altSizes[altSizes.length - 3].url;

				const img = document.createElement('img');
				img.src = imgSrc;

				const li = document.createElement('li');
				li.appendChild(img);

				// li.innerHTML = imgSrc;

				list.appendChild(li);

				}
			}
		})

reset();
// 		// error message if API is not working
// 		.catch(function(err){
// 			window.alert('Hey, seems like the tumblr API is down, please try again later.');
// 			console.log('message:', err);
// 		})
// }

// getTaggedPhotos('food')