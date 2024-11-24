// console.log("Hello world");

let board;
let score = 0;
let rows = 4;
let columns = 4;

let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;


let startX = 0;
let startY = 0;

function setGame(){

	board = [
	 	[0, 0, 0, 0],
	 	[0, 0, 0, 0],
	 	[0, 0, 0, 0],
	 	[0, 0, 0, 0]
	];


	for(let r=0; r<rows; r++){
		for(let c=0; c < columns; c++){

			let tile = document.createElement("div");
			tile.id = r.toString() + "-" + c.toString();
			let num = board[r][c];

			updateTile(tile, num);
			document.getElementById("board").append(tile);
		}
	}

setTwo();
setTwo();

}

function updateTile(tile, num){
	tile.innerText = "";
	tile.classList.value = "";

	tile.classList.add("tile");

	if(num > 0){
		tile.innerText = num.toString();

		if(num <= 4096){
			tile.classList.add("x"+num);
		}
		else{
			tile.classList.add("x8192");
		}
	}
}

window.onload = function() {
	setGame();
}




function handleSlide(e){
	console.log(e.code);
	e.preventDefault();

	if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)){


		if(e.code == "ArrowLeft"){
			slideLeft();
			setTwo();
		}
		else if(e.code == "ArrowRight"){
			slideRight();
			setTwo();
		}
		else if(e.code == "ArrowUp"){
			slideUp();
			setTwo();
		}
		else if(e.code == "ArrowDown"){
			slideDown();
			setTwo();
		}
	}

	document.getElementById("score").innerText = score;

	setTimeout(() => {
		if(hasLost() == true){
			alert("Game Over! You suck. Game will restart because you suck so bad.");
			restartGame();
			alert("Click any arrow key to restart the game you suck at");
		}
		else{
			checkWin();
		}
	}, 100)

}

document.addEventListener("keydown", handleSlide);


function slideLeft(){

	for(let r=0; r<rows; r++){
		let row = board[r];

		let originalRow = row.slice();

		row = slide(row);
		board[r] = row;

		for (let c=0; c<columns; c++){


			let tile = document.getElementById(r.toString() + "-" + c.toString())
			
			let num = board[r][c];

			if(originalRow[c] !== num && num !== 0){
				tile.style.animation = "slide-from-right 0.3s";

				setTimeout(() => {
					tile.style.animation = "";
				}, 300)
			}


			updateTile(tile, num);
		}

		
			
		}
	}



function slideRight(){
	for(let r=0; r<rows; r++){
		let row = board[r];

		let originalRow = row.slice();
		row.reverse();
		row = slide(row);
		row.reverse();
		board[r] = row;
		for (let c=0; c<columns; c++){
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];

			if(originalRow[c] !== num && num !== 0){
				tile.style.animation = "slide-from-left 0.3s";

				setTimeout(() => {
					tile.style.animation = "";
				}, 300)
			}


			updateTile(tile, num);
		}
	}
}

function slideUp(){
	for(let c=0; c<columns; c++){
		let col = [board[0][c], board[1][c], board[2][c], board[3][c]];

		let originalCol = col.slice();
		col = slide(col);
		
		for (let r=0; r<rows; r++){

			board[r][c] = col[r];
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];

			if(originalCol[c] !== num && num !== 0){
				tile.style.animation = "slide-from-bottom 0.3s";

				setTimeout(() => {
					tile.style.animation = "";
				}, 300)
			}


			updateTile(tile, num);
		}
	}
}

function slideDown(){
	for(let c=0; c<columns; c++){
		let col = [board[0][c], board[1][c], board[2][c], board[3][c]];

		let originalCol = col.slice();

		col.reverse();
		col = slide(col);
		col.reverse();

		
		for (let r=0; r<rows; r++){

			board[r][c] = col[r];
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];

			if(originalCol[c] !== num && num !== 0){
				tile.style.animation = "slide-from-top 0.3s";

				setTimeout(() => {
					tile.style.animation = "";
				}, 300)
			}

			updateTile(tile, num);
		}
	}
}




function slide(tiles){

	tiles = filterZero(tiles);

	for(let i=0; i<tiles.length-1; i++){
		if(tiles[i] == tiles[i+1]){
			tiles[i] *=2;
			tiles[i+1] = 0;
			score += tiles[i];
		}
	}

	tiles = filterZero(tiles);

	while(tiles.length < columns){
		tiles.push(0);

	}

	return tiles;
}

function filterZero(tiles){
	return tiles.filter(num => num !=0);
}


function hasEmptyTile(){
	for(let r=0; r <rows; r++){
	 	for(let c=0; c < columns; c++){

	 		if(board[r][c] == 0){
	 			return true;
	 		}
	 	}
	}
	return false;
}


function setTwo(){

	if(hasEmptyTile() == false){
		return;
	}

	let found = false;

	while(!found){
		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * columns);

		if(board[r][c] == 0){
			board[r][c] = 2;
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			tile.innerText = "2";
			tile.classList.add("x2");

			found = true;
		}
	}



}

function checkWin(){
	for(let r=0; r <rows; r++){
	 	for(let c=0; c < columns; c++){

	 		if(board[r][c] == 2048 && is2048Exist == false){
	 			alert("Yey");
	 			is2048Exist = true;
	 		}

	 		else if(board[r][c] == 4096 && is4096Exist == false){
	 			alert("Angap");
	 			is4096Exist = true;
	 		}

	 		else if(board[r][c] == 8192 && is8192Exist == false){
	 			alert("Adik! Tama na!");
	 			is8192Exist = true;
	 		}
	 	}
	 }
}

function hasLost(){
	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){

			// it will check if there is an empty tile in our board
			if(board[r][c] == 0 ){
				return false;
			}

			const currentTile = board[r][c];

			if(
				
				r > 0 && currentTile === board[r-1][c] ||
				
				r < rows - 1 &&  currentTile === board[r+1][c] || 
				
				c > 0 && currentTile === board[r][c-1] ||
				
				c < columns -1 && board[r][c+1] === currentTile
			){
				return false;
			}
		}
	}
	return true;
}

function restartGame(){
	board = [
	 	[0, 0, 0, 0],
	 	[0, 0, 0, 0],
	 	[0, 0, 0, 0],
	 	[0, 0, 0, 0]
	];
	score = 0;
	setTwo();


}


document.addEventListener("touchstart", (e) => {
	startX = e.touches[0].clientX;
	startY = e.touches[0].clientY;
})


document.addEventListener("touchend", (e) => {
	if(!e.target.className.includes("tile")){
			return;
		}

		diffX = startX - e.changedTouches[0].clientX;
		diffY = startY - e.changedTouches[0].clientY;

		if(diffX !== 0 && diffY !== 0){

			if(Math.abs(diffX) > Math.abs(diffY)){
				if(diffX > 0){
					slideLeft();
					setTwo();

				}
				else{
					slideRight();
					setTwo();
				}
			}
			else{
				if(diffY > 0){
					slideUp();
					setTwo();

				}
				else{
					slideDown();
					setTwo();
						
			}
		}

	}

	document.getElementById("score").innerText = score;

	setTimeout(() => {
		if(hasLost() == true){
			alert("Game Over! You suck. Game will restart because you suck so bad.");
			restartGame();
			alert("Click any arrow key to restart the game you suck at");
		}
		else{
			checkWin();
		}
	}, 100)



});

document.addEventListener("touchmove", (e) => {
	if(!e.target.className.includes("tile")){
		return;
	}

	e.preventDefault();


}, {passive: false})
