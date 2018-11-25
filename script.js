window.onload = function() {	
	let holst = document.getElementById("holst");
	let pallet = document.getElementById("paintsPanel");
	let choosenColor;
	initialiseHolst(30, 20);
	initializePallet(pallet, 38);
}

function initialiseHolst(weigth, height){
	for (let i=0; i<height; ++i){
		let row = document.createElement("div");
		for (let j=0; j<weigth; ++j){
			let pxl = document.createElement("span");
			pxl.className = "pixel";
			pxl.addEventListener("click", function(){
				console.log(`pixel ${i},${j} fired`);
				pxl.style.backgroundColor = choosenColor.style.backgroundColor;
			});
			row.appendChild(pxl);
		}
		holst.appendChild(row);
	}
}

random_color = () => {

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
	pallet.appendChild(document.createTextNode("CURRENT COLOR > "));
	choosenColor = document.createElement("span");
	choosenColor.className = "color";
	choosenColor.style.backgroundColor = "white";
	pallet.appendChild(choosenColor);

}