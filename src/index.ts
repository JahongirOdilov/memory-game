import "./main.css";

const boardElm: HTMLDivElement = document.querySelector("#board")!;
const container: HTMLDivElement = document.querySelector(".container")!;
const levelElm: HTMLParagraphElement = document.querySelector(".level")!;
const timer: HTMLDivElement = document.querySelector(".timer")!;
const restartBtn: HTMLDivElement = document.querySelector(".restart")!;
const btnRestart: HTMLButtonElement = document.querySelector(".restart-btn")!;
const gameOver: HTMLParagraphElement = document.querySelector(".over")!;

// LOGICAL VARIABLES
let numberCells: number = 9;
let numberIcons: number = 3;

let level: number = 0;
let cells: string[] = [];
let correctAnswers = 0;
let count: number = 0;
let count2: number = 0;

// let s = 20;
let countdownInterval: any;

// HANDLE FUNCTIONS
function handleCell(cell: HTMLDivElement, cellIdx: number) {
	if (!cells[cellIdx]) {
		restartBtn.style.display = "block";
		container.style.display = "none";
		gameOver.style.display = "block";
		return setTimeout(init, 1000);
	}

	correctAnswers++;
	cell.classList.add("active");

	if (correctAnswers === numberIcons + count2) {
		// sekund = "";
		time();
		setTimeout(init, 1000);
		count++;

		if (count % 2 === 0) {
			count2++;
			numberIcons++;
			numberCells = numberIcons * numberIcons;
			boardElm.style.gridTemplateColumns = `repeat(${numberIcons}, 1fr)`;
			boardElm.style.gridTemplateRows = `repeat(${numberIcons}, 1fr)`;
		}
	}
}

function handelRestartBtn(): void {
	btnRestart.addEventListener("click", () => {
		restartBtn.style.display = "none";
		container.style.display = "flex";
		gameOver.style.display = "none";
		count = 0;
		count2 = 0;
		level = 0;
		numberCells = 9;
		numberIcons = 3;
		boardElm.style.gridTemplateColumns = `repeat(3, 1fr)`;
		boardElm.style.gridTemplateRows = `repeat(3, 1fr)`;
		init();
	});
}

// RENDER FUNCTIONS
function renderCells() {
	boardElm.innerHTML = "";
	const initCellElms: HTMLDivElement[] = [];

	for (let idx = 0; idx < cells.length; idx++) {
		const cell = cells[idx];
		const cellElm = document.createElement("div");
		cellElm.classList.add("cell");

		if (cell) {
			cellElm.classList.add("active");
			cellElm.innerText = cell;
			initCellElms.push(cellElm);
		}

		cellElm.onclick = (e) => handleCell(e.target as HTMLDivElement, idx);
		boardElm.append(cellElm);
	}

	setTimeout(() => {
		for (const cellElm of initCellElms) cellElm.classList.remove("active");
	}, 1000);
}

function time() {
	let s = 20;
	let sekund = setInterval(() => {
		if (s === 0) {
			clearInterval(sekund);
			timer.innerText = `00 : ${s < 10 ? "0" + s : s}`;
		} else {
			timer.innerText = `00 : ${s < 10 ? "0" + s : s}`;
			s--;
		}
	}, 1000);
}

// LOGIC FUNCTIONS
function init() {
	level++;
	levelElm.innerText = `Level-${level}`;

	correctAnswers = 0;
	cells = new Array(numberIcons + count2).fill("🍎");
	const stayCells = new Array(numberCells - (numberIcons + count2)).fill("");

	cells = [...cells, ...stayCells].sort(() => Math.random() - 0.5);

	renderCells();
	time();
	handelRestartBtn();
}

init();
