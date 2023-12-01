const { readFile } = require('../utils/utils');
const inputFile = `${__dirname}/input`;
const inputFile2 = `${__dirname}/test_input2`;

async function part1(input) {
	const res = input.map(i => {
		const first = i.split('').find(element => element.match(/[0-9]/));
		const last = i.split('').findLast(element => element.match(/[0-9]/));

		return Number(`${first}${last}`);
	}).reduce((prev, acc) => prev + acc, 0)

	console.log(res);
}

function numMap(input) {
	if (!Number.isNaN(Number.parseInt(input))) return input;

	const nMap = {
		'one': 1,
		'two': 2,
		'three': 3,
		'four': 4,
		'five': 5,
		'six': 6,
		'seven': 7,
		'eight': 8,
		'nine': 9
	}

	return nMap[input];
}

async function part2(input) {
	const regex = /(?=(four|eight|two|seven|five|three|six|nine|one|[0-9])\w*)/g
	const res = input.map(i => {
		const matches = [...i.matchAll(regex)];
		const first = numMap(matches[0][1]);
		const last = numMap(matches[matches.length - 1][1]);
		const result = Number(`${first}${last}`);

		return result;
	}).reduce((prev, acc) => prev + acc, 0)

	console.log(res);
}

(async function run() {
	const input = await readFile(inputFile);

	part1(input);
	part2(input);
})();