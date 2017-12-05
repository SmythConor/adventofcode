const utils = require('../utils/utils');
const input = `${__dirname}/input`;

part1();
part2();

function part2() {
	const lines = utils.readFile(input);
	lines
		.then((output) => {
			const values = output.map(Number);
			// const values = [0, 3, 0, 1, -3];

			const upperBound = values.length;
			let outside = false;
			let pointer = 0;
			let stepCounter = 0;

			while (!outside) {
				const value = values[pointer];

				if (value >= 3) {
					values[pointer]--;
				} else {
					values[pointer]++;
				}

				pointer += value;
				stepCounter++;

				if (pointer >= upperBound) {
					outside = true;
				}
			}

			console.log(`Took ${stepCounter} steps which should equal 26948068`);
		})
		.catch(console.log);
}

function part1() {
	const lines = utils.readFile(input);
	lines
		.then((output) => {
			const values = output.map(Number);
			// const values = [0, 3, 0, 1, -3];

			const upperBound = values.length;
			let outside = false;
			let pointer = 0;
			let stepCounter = 0;

			while (!outside) {
				const value = values[pointer];
				values[pointer]++;

				pointer += value;
				stepCounter++;
				if (pointer >= upperBound) {
					outside = true;
				}
			}
			console.log(`Took ${stepCounter} steps which should equal 355965`);
		})
		.catch(console.log);
}