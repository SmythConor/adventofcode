const fs = require('fs')
const input = '/Users/conor/work/adventofcode/day_4/input';

function part1() {
	fs.readFile(input, 'utf-8', (err, data) => {
		if (err) {
			console.error(`An error occurred: ${err}`);
		}

		if (data) {
			const lines = data.split('\n');
			const validLines = lines.filter((line) => {
				const words = line.split(' ');
				const length = words.length;
				const uniqueWords = new Set(words);

				if (length === uniqueWords.size) {
					return line;
				}
			});

			console.log(`There is ${validLines.length} valid lines which should equal 455`);
		}
	});
}

function part1Filter(line) {
	const words = line.split(' ');
	const length = words.length;
	const uniqueWords = new Set(words);

	if (length === uniqueWords.size) {
		return line;
	}
}

function part2Filter(line) {
	const words = line.split(' ');

	const letterCountPerWord = words.map(getLetterInstances);
	let isValid = (() => {
		for (let i = 0; i < letterCountPerWord.length - 1; i++) {
			const currentWord = letterCountPerWord[i];

			for (let j = i + 1; j < letterCountPerWord.length; j++) {
				const nextWord = letterCountPerWord[j];
				if (deepEquals.call(currentWord, nextWord)) {
					return false;
				}
			}
		}

		return true;
	})();

	if (isValid) {
		return line;
	}
}

function part2() {
	fs.readFile(input, 'utf-8', (err, data) => {
		if (err) {
			console.error(`An error occurred: ${err}`);
		}

		if (data) {
			const lines = data.split('\n');
			const validLines = lines.filter(part1Filter).filter(part2Filter);

			console.log(`There is ${validLines.length} valid lines which should equal 186`);
		}
	});
}

part2();

function deepEquals(obj) {
	const keys = Object.keys(this);
	const objKeys = Object.keys(obj);

	if (keys.length !== objKeys.length) {
		return false;
	}

	if (keys.length === 0 && objKeys === 0) {
		return true;
	}

	const isEqual = keys.every((key) => obj.hasOwnProperty(key) && this[key] === obj[key], this);

	return isEqual;
}

function getLetterInstances(word) {
	let counts = {};

	for (let i = 0; i < word.length; i++) {
		const character = word.charAt(i);

		if (!counts[character]) {
			counts[character] = 0;
		}

		counts[character]++;
	}

	return counts;
}