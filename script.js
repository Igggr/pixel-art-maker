let fieldWidth = 30;
let fieldHight = 20;

let arr = Array(fieldHight).fill(null).map(item => Array(fieldWidth).fill("white"));


window.onload = function() {	
	let holst = document.getElementById("holst");
	let pallet = document.getElementById("paintsPanel");
	let choosenColor;
	initialiseHolst();
	initializePallet(pallet, 45);	
};

function initialiseHolst(){
	for (let i=0; i<fieldHight; ++i){
		let row = document.createElement("div");
		for (let j=0; j<fieldWidth; ++j){
			let pxl = document.createElement("span");
			pxl.className = "pixel";
			pxl.style.backgroundColor = arr[i][j];
			console.log(arr[i][j]);
			pxl.addEventListener("click", function(){
				console.log(`pixel ${i},${j} fired`);
				pxl.style.backgroundColor = choosenColor.style.backgroundColor;
				arr[i][j] = choosenColor.style.backgroundColor;
			});
			row.appendChild(pxl);
		}
		holst.appendChild(row);
	}
}

const random_color = () => {
	return `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255} )`;
};

function initializePallet(pallet, ammount){
	for (let i=0; i<ammount; ++i){
		let color = document.createElement("span");
		color.className = "color";
		color.style.backgroundColor = random_color();
		color.addEventListener('click', function() {
			console.log(`picked color ${color.style.backgroundColor}`);
			choosenColor.style.backgroundColor = color.style.backgroundColor;
		})
		pallet.appendChild(color);
	}
	initializeCurrentColor(pallet);
	initializeMoreColors(pallet);
	initializeLoadButton(pallet);
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

const initializeLoadButton = (pallet) => {
	let load = document.createElement("button");
	load.innerHTML = "load";
	load.style.margin = '20px';
	load.addEventListener("click", function() {
		arr = JSON.parse(localStorage.image);
		console.log(`request to load`);
		while (holst.hasChildNodes()) {
			console.log("removing");
			holst.removeChild(holst.firstChild);
		}
		initialiseHolst();	
	});
	pallet.appendChild(load);

	let save = document.createElement("button");
	save.innerHTML = "save";
	save.addEventListener("click", function() {
		console.log(`request to save`);
		localStorage.setItem("image", JSON.stringify(arr));
	})
	pallet.appendChild(save);
};