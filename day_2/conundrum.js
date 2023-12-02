const { readFile } = require('../utils/utils');
const inputFile = `${__dirname}/input`;

function getNum(input) {
	return Number(input.match(/[0-9]*/)[0]);
}

const rules = {
	'red': (input) => getNum(input) <= 12,
	'green': (input) => getNum(input) <= 13,
	'blue': (input) => getNum(input) <= 14
}

async function getInput() {
	const input = await readFile(inputFile);

	return input
		.map(i => i.split(':'))
		.map(g => {
			const game = g[0].match(/[0-9]+/)[0];
			const cubeDetails = g[1].split(';').map(i => i.trim());
			const cubeGroups = cubeDetails
				.map(i => i.match(/[0-9]* [a-z]*/g))
				.flatMap(i => i.map(j => j.trim()))
				.filter(i => i)
				.map(i => {
					const m = i.match(/([0-9]*) ([a-z]*)/);
					const count = m[1];
					const colour = m[2];

					return { colour, count };
				})

			return { game, cubeGroups };
		});
}

async function part1(gameDetails) {
	const result = gameDetails.reduce((prev, acc) => {
		const isValid = acc.cubeGroups.every(group => rules[group.colour](group.count));

		if (isValid) return prev + Number(acc.game)
		else return prev
	}, 0)

	console.log(result)
}

async function part2(gameDetails) {

}

(async () => {
	const input = await getInput();
	part1(input);
})();