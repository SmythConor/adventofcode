const utils = require('../utils/utils');
const inputFile = `${__dirname}/input`;

const registers = {};
let max = 0;

const operations = {
	'inc': (x, y) => x + y,
	'dec': (x, y) => x - y,
	'>': (x, y) => x > y,
	'>=': (x, y) => x >= y,
	'<': (x, y) => x < y,
	'<=': (x, y) => x <= y,
	'==': (x, y) => x == y,
	'!=': (x, y) => x != y
}

function readExpression(input) {
	const splitExpression = input.split(' ');

	const expression = {
		register: splitExpression[0],
		operation: operations[splitExpression[1]],
		value: Number(splitExpression[2])
	};

	return expression;
}

function executeExpression(i, p) {
	const predicate = () => {
		const register = p.register;

		if (!registers[register]) {
			registers[register] = 0;
		}

		return p.operation(registers[register], p.value);
	}

	const instruction = () => {
		const register = i.register;

		if (!registers[register]) {
			registers[register] = 0;
		}

		return i.operation(registers[register], i.value);
	}

	if (predicate()) {
		const register = i.register;

		registers[register] = instruction();

		if (registers[register] > max) {
			max = registers[register];
		}
	}
}

utils.readFile(inputFile)
	.then((input) => {
		const splitInput = input.map(line => line.split('if').map(value => value.trim()));

		splitInput.forEach(input => {
			const instruction = readExpression(input[0]);
			const predicate = readExpression(input[1]);

			executeExpression(instruction, predicate);
		});

		console.log(Math.max(...Object.values(registers)));
		console.log(max);
	})
	.catch(console.log);