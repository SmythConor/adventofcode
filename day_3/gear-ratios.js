const { readFile } = require('../utils/utils');
const inputFile = `${__dirname}/input`;

function isSymbol(input) {
	return isNaN(Number(input)) && input != '.';
}

function isNumber(input) {
	return !isNaN(Number(input));
}

(async function part1() {
	const input = await readFile(inputFile);
	const grid = input.map(line => line.split(''));

	const coords = [];
	const tmp = {};

	for (let y = 0; y < grid.length; y++) {
		const row = grid[y];
		let currentNumber = null;
		let currentCoords = [];

		for (let x = 0; x < row.length; x++) {
			const col = row[x];

			const isNumber = !isNaN(Number(col));

			if (isNumber) {
				if (!currentNumber) {
					currentNumber = col;
				} else {
					currentNumber += col;
				}
				currentCoords.push(`${y}${x}`);
			}

			if (currentNumber && !isNumber) {
				coords.push({
					coords: currentCoords,
					num: Number(currentNumber)
				});
				currentNumber = null;
				currentCoords = [];
			} else if (x + 1 == row.length) {
				coords.push({
					coords: currentCoords,
					num: Number(currentNumber)
				});
			}
		}
	}

	// const visited = {};
	const visited = [];
	const nums = [];

	function visit(ogy, ogx, y, x) {
		// if (visited[`${ogy}${ogx}`] && visited[`${ogy}${ogx}`].includes(`${y}${x}`)) return;
		if (visited.includes(`${y}${x}`)) return;

		const spot = grid[y][x];

		if (isNumber(spot)) {
			const i = coords.findIndex((entry) => entry.coords.includes(`${y}${x}`));
			nums.push(coords[i].num)

			// if (!visited[`${ogy}${ogx}`]) visited[`${ogy}${ogx}`] = [];
			// visited[`${ogy}${ogx}`].push(...coords[i].coords);
			visited.push(...coords[i].coords);
		}
	}

	for (let y = 0; y < grid.length; y++) {
		const row = grid[y];

		for (let x = 0; x < row.length; x++) {
			const col = row[x];
			if (isSymbol(col)) {
				if (y - 1 >= 0) {
					if (x - 1 >= 0) {
						visit(y, x, y - 1, x - 1);
						visit(y, x, y, x - 1);
					}
					visit(y, x, y - 1, x);
					if (x + 1 < row.length) {
						visit(y, x, y - 1, x + 1);
						visit(y, x, y, x + 1);
					}
				}
				if (y + 1 < grid.length) {
					if (x - 1 >= 0) {
						visit(y, x, y + 1, x - 1)
					}
					visit(y, x, y + 1, x);
					if (x + 1 < row.length) {
						visit(y, x, y + 1, x + 1)
					}
				}
			}
		}
	}

	// 479604 too low
	// 524647 too low
	console.log(coords);
	console.log(nums.reduce((prev, acc) => prev + acc, 0));
})();