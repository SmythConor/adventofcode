const utils = require('../utils/utils');
const input = `${__dirname}/input`;

part1();
part2();

function solve(pointerModifier) {
	return new Promise((resolve, reject) => {
		const lines = utils.readFile(input);
		lines
			.then((output) => {
				const values = output.map(Number);

				const upperBound = values.length;
				let outside = false;
				let pointer = 0;
				let stepCounter = 0;

				while (!outside) {
					const value = values[pointer];

					values[pointer] = pointerModifier(values[pointer]);

					pointer += value;
					stepCounter++;

					if (pointer >= upperBound) {
						outside = true;
					}
				}

				resolve(stepCounter);
			})
			.catch(reject);
	});
}

function part2(pointerModifier) {
	let stepCounter = solve((value) => {
			if (value >= 3) {
				return value - 1;
			} else {
				return value + 1;
			}
		})
		.then((stepCounter) => {
			console.log(`Took ${stepCounter} steps which should equal 26948068`);
		})
		.catch(console.log);
}

function part1() {
	let stepCounter = solve((value) => value + 1)
		.then((stepCounter) => {
			console.log(`Took ${stepCounter} steps which should equal 355965`);
		})
		.catch(console.log);
}