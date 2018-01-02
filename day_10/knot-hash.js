const utils = require('../utils/utils');
const inputFile = `${__dirname}/input`;

const hash = [...Array(256).keys()];

function pad(str) {
	return [...str.split('').map(c => c.charCodeAt(0)), ...[17, 31, 73, 47, 23]];
}

function* blockGenerator(arr, step) {
	let builder = [];

	for (let i = 0; i < arr.length; i++) {
		builder.push(arr[i]);

		if ((i + 1) % step === 0) {
			yield builder;

			builder = [];
		}
	}
}

function generateDenseHash(sparseHash) {
	const gene = blockGenerator(sparseHash, 16);

	const denseHash = [...gene].map(element => element.reduce((previous, current) => previous ^ current, 0));

	return denseHash;
}

utils.readFile(inputFile)
	.then((input) => {
		let pointer = 0;
		let skip = 0;

		const paddedInput = pad(input[0]);

		function executeRound(length) {
			reverse(pointer, length, hash);

			pointer = (pointer + length + skip) % hash.length;
			skip++;
		}

		const formattedPaddedInput = paddedInput.map(Number);

		for (let i = 0; i < 64; i++) {
			formattedPaddedInput.forEach(executeRound);
		}

		const denseHash = generateDenseHash(hash);

		const hexHash = denseHash.map(v => v.toString(16)).map(String).map(v => v.padStart(2, 0)).join('');

		console.log(hexHash);
	})
	.catch(err => console.log(err));

function part1() {
	utils.readFile(inputFile, ',')
		.then((input) => {
			let pointer = 0;
			let skip = 0;

			input.map(Number).forEach(length => {
				reverse(pointer, length, hash);

				pointer = (pointer + length + skip) % hash.length;
				skip++;
			});

			console.log(hash[0] * hash[1]);
		})
		.catch(err => console.log(err));
}


function reverse(start, length, array) {
	let finish = start + length - 1;

	while (start < finish) {
		let pointer = start % array.length;
		let end = finish % array.length;

		let toEnd = array[pointer];

		array[pointer] = array[end];
		array[end] = toEnd;

		start++;
		finish--;
	}
}

// part 1 -> 23874
// part 2 -> e1a65bfb5a5ce396025fab5528c25a87