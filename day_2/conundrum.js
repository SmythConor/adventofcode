const { readFile } = require('../utils/utils');
const inputFile = `${__dirname}/input`;

const rules = {
	'red': (input) => input <= 12,
	'green': (input) => input <= 13,
	'blue': (input) => input <= 14
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

					return { colour, count: Number(count) };
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
	const result = gameDetails.reduce((counter, currentGamne) => {
		const cubeMins = {
			'red': 0,
			'green': 0,
			'blue': 0
		}

		for (let j = 0; j < currentGamne.cubeGroups.length; j++) {
			const group = currentGamne.cubeGroups[j];

			if (group.count > cubeMins[group.colour]) {
				cubeMins[group.colour] = group.count
			}
		}

		return counter + (cubeMins.red * cubeMins.green * cubeMins.blue);
	}, 0);

	console.log(result);
}

(async () => {
	const input = await getInput();
	part1(input);
	part2(input);
})();