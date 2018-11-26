/*
ToDo:  Improve the mouse so it behaves like a real paintbrush. 
In other words, allow the user to paint by clicking and dragging across the canvas. 
For this, you'll need a combination of the mousedown, mouseenter, and mouseup events.
*/

let emptyField = () => Array(fieldHight).fill(null).map(item => Array(fieldWidth).fill("white")); 

let pallet;
let choosenColor = "white";
let fieldWidth = 40;
let fieldHight = 20;
let ammountOfColors = 44;
let paintAll = false;
let arr = emptyField();
let last;


window.onload = function() {	
	let holst = document.getElementById("holst");
	pallet = document.getElementById("paintsPanel");	

	initialiseHolst();
	initialisePallet(pallet, ammountOfColors);
	initializeCurrentColor(pallet);
	initializeMoreColors(pallet);

	addLoadButton();
	addSaveButton();	
	addBucketButton();
	addBackButton(pallet);
	addNewBlankButton();
};

function initialiseHolst(){
	for (let i=0; i<fieldHight; ++i){
		let row = document.createElement("div");
		for (let j=0; j<fieldWidth; ++j){
			let pxl = document.createElement("span");
			pxl.className = "pixel";
			pxl.style.backgroundColor = arr[i][j];
			pxl.addEventListener("click", () => paint(pxl, i, j) );			
			row.appendChild(pxl);
		}
		holst.appendChild(row);
	}
}

const paint = (pxl, i, j) => {
	console.log(`pixel ${i},${j} fired`);
	saveAs("backUp", JSON.stringify(arr));
	if (paintAll)
		paintArea(i, j);
	else {
		pxl.style.backgroundColor = choosenColor.style.backgroundColor;
		arr[i][j] = choosenColor.style.backgroundColor;
    }
};

const random_color = () => {
	return `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255} )`;
};

function initialisePallet(pallet, ammount){
	for (let i=0; i<ammount; ++i){
		let color = document.createElement("span");
		color.className = "color";
		color.style.backgroundColor = random_color();
		color.addEventListener('click', function() {
			console.log(`picked color ${color.style.backgroundColor}`);
			paintAll = false;
			choosenColor.style.backgroundColor = color.style.backgroundColor;
		})
		pallet.appendChild(color);
	}	
}

const initializeCurrentColor = (pallet) => {
	pallet.appendChild(document.createTextNode("CURRENT COLOR > "));
	choosenColor = document.createElement("span");
	choosenColor.className = "color";
	choosenColor.style.backgroundColor = "white";
	pallet.appendChild(choosenColor);	
};

const initializeMoreColors = (pallet) => {
	pallet.appendChild(document.createTextNode("MORE COLORS > "));
	let typecolor = document.createElement("input");
	typecolor.type ="color";
	typecolor.addEventListener("change", function(){
		console.log(`input color is changed to: ${typecolor.value}`);
		choosenColor.style.backgroundColor = typecolor.value;
	});
	pallet.appendChild(typecolor);
};

const removeCurrentImage = () => {
	while (holst.hasChildNodes()) {
			console.log("removing");
			holst.removeChild(holst.firstChild);
		}
};

const saveAs = (backupName) => {
	localStorage.setItem(backupName, JSON.stringify(arr));
};

const load = (backupName) => {
	console.log("loading...");
	arr = JSON.parse(localStorage[backupName]);
	removeCurrentImage();
	initialiseHolst();
};

const addNewButton = (buttonText, event, eventFunction) => {
	let myButton = document.createElement("button");
	myButton.innerHTML = buttonText;
	myButton.addEventListener(event, eventFunction); 
	pallet.appendChild(myButton);
};

const addLoadButton = () =>
{
	addNewButton("load", "click", () => load("image"));
};

const addBackButton = () => {
	addNewButton("back", "click", () => load("backUp"));

};

const addSaveButton = () => {
	let eventFunction = () => {
		console.log("saved");
		saveAs("image");
	};
	addNewButton("save", "click", eventFunction);
};

const addBucketButton = () => {
	const eventFunction = () => {
		console.log("bucket of paint");
		paintAll = true;
	};
	addNewButton("bucket", "click", eventFunction);
};

const addNewBlankButton = () => {
	addNewButton("blank page", "click", () => {
		console.log("blank page will be loaded");
		removeCurrentImage();
		arr = emptyField();
		initialiseHolst();
	})
};

const paintArea = (i, j) => {
	console.log(`paint whole area invoked on point ${i}, ${j}`);
	removeCurrentImage();
    flood(i, j, arr[i][j], choosenColor.style.backgroundColor);
	initialiseHolst();
};

const flood = (i, j, targetColor, replacementColor) => {
	if (arr[i][j] === replacementColor){
		return;
	}
	if (arr[i][j] !== targetColor){
		return;
	} 
	arr[i][j] = replacementColor;
	if (i > 0)
		flood(i-1, j, targetColor, replacementColor);
	if (i < fieldHight - 1)
		flood(i+1, j, targetColor, replacementColor);
	if (j > 0)
		flood(i, j-1, targetColor, replacementColor);
	if (j < fieldWidth - 1)
		flood(i, j+1, targetColor, replacementColor);
	return;
}