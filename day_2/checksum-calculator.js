function getDivisorElements(arr) {
	for (let i = 0; i < arr.length; i++) {
		let element = arr[i];

		for (let j = i + 1; j < arr.length; j++) {
			const otherElement = arr[j];
			const largest = Math.max(element, otherElement);
			const smallest = Math.min(element, otherElement);

			if (largest % smallest === 0) {
				return largest / smallest;
			}
		}
	}
}

const input = [
	[278, 1689, 250, 1512, 1792, 1974, 175, 1639, 235, 1635, 1690, 1947, 810, 224, 928, 859],
	[160, 50, 55, 81, 68, 130, 145, 21, 211, 136, 119, 78, 174, 155, 149, 72],
	[4284, 185, 4499, 273, 4750, 4620, 4779, 4669, 2333, 231, 416, 1603, 197, 922, 5149, 2993],
	[120, 124, 104, 1015, 1467, 110, 299, 320, 1516, 137, 1473, 132, 1229, 1329, 1430, 392],
	[257, 234, 3409, 2914, 2993, 3291, 368, 284, 259, 3445, 245, 1400, 3276, 339, 2207, 233],
	[1259, 78, 811, 99, 2295, 1628, 3264, 2616, 116, 3069, 2622, 1696, 1457, 1532, 268, 82],
	[868, 619, 139, 522, 168, 872, 176, 160, 1010, 200, 974, 1008, 1139, 552, 510, 1083],
	[1982, 224, 3003, 234, 212, 1293, 1453, 3359, 326, 3627, 3276, 3347, 1438, 2910, 248, 2512],
	[4964, 527, 5108, 4742, 4282, 4561, 4070, 3540, 196, 228, 3639, 4848, 152, 1174, 5005, 202],
	[1381, 1480, 116, 435, 980, 1022, 155, 1452, 1372, 121, 128, 869, 1043, 826, 1398, 137],
	[2067, 2153, 622, 1479, 2405, 1134, 2160, 1057, 819, 99, 106, 1628, 1538, 108, 112, 1732],
	[4535, 2729, 4960, 241, 4372, 3960, 248, 267, 230, 5083, 827, 1843, 3488, 4762, 2294, 3932],
	[3245, 190, 2249, 2812, 2620, 2743, 2209, 465, 139, 2757, 203, 2832, 2454, 177, 2799, 2278],
	[1308, 797, 498, 791, 1312, 99, 1402, 1332, 521, 1354, 1339, 101, 367, 1333, 111, 92],
	[149, 4140, 112, 3748, 148, 815, 4261, 138, 1422, 2670, 32, 334, 2029, 4750, 4472, 2010],
	[114, 605, 94, 136, 96, 167, 553, 395, 164, 159, 284, 104, 530, 551, 544, 18]
];

function solve(input, mapFunction) {
	const result = input.map(mapFunction).reduce((previous, current) => previous + current, 0);

	return result;
}

function run(input, expectedResult) {
	const result = this.solveFunction(input);
	console.log(`The result of ${input} is\n${result}, which should equal ${expectedResult}`);
}

function part1() {
	return (function () {
		return {
			mapFunction: (value) => {
				const largestValue = Math.max(...value);
				const smallestValue = Math.min(...value);

				return largestValue - smallestValue;
			},
			solveFunction: function (input) {
				const result = solve(input, this.mapFunction);

				return result;
			},
			run: function (input) {
				run.call(this, input, 42378);
			}
		};
	})();
}

function part2() {
	return (function () {
		return {
			mapFunction: (value) => {
				const result = getDivisorElements(value);

				return result;
			},
			solveFunction: function (input) {
				const result = solve(input, this.mapFunction);

				return result;
			},
			run: function (input) {
				run.call(this, input, 246);
			}
		};
	})();
}

part1().run(input);
part2().run(input);