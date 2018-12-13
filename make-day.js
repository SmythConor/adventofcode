const fs = require('fs');
const day = process.argv[2];
const programName = `${process.argv[3].split(' ').join('-').toLowerCase()}.js`;

const programDefaults = 'const utils = require(\'../utils/utils\');\nconst inputFile = `${__dirname}/input`;';

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

			const inputFilenames = ['test_input', 'input', programName];

			inputFilenames.forEach(inputFilename => {
				const output = (() => {
					if (inputFilename.indexOf('.js') > 0) {
						return programDefaults;
					} else {
						return '';
					}
				})();

				fs.writeFile(`${dirName}/${inputFilename}`, output, (err) => {
					if (err) {
						console.log(err);
					} else {
						console.log(`Making file ${dirName}/${inputFilename}`);
					}
				});
			});
		}
	});
}
