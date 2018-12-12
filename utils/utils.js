module.exports = {
	deepEquals: function (obj) {
		const keys = Object.keys(this);
		const objKeys = Object.keys(obj);
		const keysLength = keys.length;
		const objKeysLength = objKeys.length;

		if (keysLength !== objKeysLength) {
			return false;
		}

		if (keysLength === 0 && objKeysLength === 0) {
			return true;
		}

		const isEqual = keys.every((key) => obj.hasOwnProperty(key) && this[key] === obj[key], this);

		return isEqual;
	},
	readFile: (fileName, sep = '\n') => {
		return new Promise((resolve, reject) => {
			const fs = require('fs');

			fs.readFile(fileName, 'utf-8', (err, data) => {
				if (err) {
					console.error(`An error occurred: ${err}`);
					reject(err);
				}

				if (data) {
					const lines = data.split(sep);

					resolve(lines);
				}
			});
		})
	},
	arraysEqual: (x, y) => {
		if (x.length !== y.length) {
			return false;
		}

		for (let i = 0; i < x.length; i++) {
			if (x[i] !== y[i]) {
				return false;
			}
		}

		return true;
	},
	arrayCount: function (predicate) {
		let count = 0;

		for (let i = 0; i < this.length; i++) {
			if (predicate.call(this, this[i])) {
				count++;
			}
		}

		return count;
	},
	arrayPick: function (predicate, format = x => x) {
		const arr = [];

		for (let i = 0; i < this.length; i++) {
			if (predicate(this[i])) {
				arr.push(format(arr[i], i));
			}
		}

		return arr;
	}
}