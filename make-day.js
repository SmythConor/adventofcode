const fs = require('fs');
const day = process.argv[2];

if (day) {
	const dirName = `day_${day}`;

	fs.mkdir(dirName, (err) => {
		if (err) {
			if (err.code !== 'EEXIST') {
				throw err;
			} else {
				console.log(`Folder already exists mate unlucky`);
			}
		} else {
			console.log(`Making directory ${dirName}`);
		}
	});
}
