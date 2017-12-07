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
	readFile: (fileName) => {
		return new Promise((resolve, reject) => {
			const fs = require('fs');

			fs.readFile(fileName, 'utf-8', (err, data) => {
				if (err) {
					console.error(`An error occurred: ${err}`);
					reject(err);
				}

				if (data) {
					const lines = data.split('\n');

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
	}
}