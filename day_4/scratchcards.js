const { readFile } = require('../utils/utils');
const inputFile = `${__dirname}/input`;

async function parse() {
	const lines = await readFile(inputFile);
	const games = lines
		.map(line => line.split(':'))
		.map(line => {
			const gameNum = Number(line[0].match(/\d+/)[0])
			const numberSplit = line[1].split('|');

			return { game: gameNum, numberSplit }
		}).map(game => {
			const winning = game.numberSplit[0].trim().match(/\d+/g).map(Number);

			return { ...game, winning };
		}).map(game => {
			const nums = game.numberSplit[1].trim().match(/\d+/g).map(Number);

			return { ...game, nums };
		})

	return games;
}

async function part1(input) {
	const games = input;

	const result = games.map(game => {
		return game.nums.reduce((acc, currentNum) => {
			if (game.winning.includes(currentNum)) {
				if (acc == 0) return 1;
				else return acc * 2;
			}

			return acc;
		}, 0)
	}).reduce((prev, curr) => prev + curr, 0);

	console.log(result);
}

async function part2(games) {
	const updatedScratchcards = [...games];
	for (let i = 0; i < updatedScratchcards.length; i++) {
		const scratchcard = updatedScratchcards[i];

		const winCount = scratchcard.nums.reduce((counter, currentNum) => {
			if (scratchcard.winning.includes(currentNum)) return counter + 1;
			else return counter;
		}, 0);

		updatedScratchcards.push(...games.slice(scratchcard.game, scratchcard.game + winCount));
	}

	console.log(updatedScratchcards.length);
}

(async function run() {
	const input = await parse();
	part1(input);
	part2(input);
})();