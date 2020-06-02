//Required Modules
const fs = require('fs');
const axios = require('axios');
const moment = require('moment');
const util = require('util');
const inquirer = require('inquirer');

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);
const readFileAsync = util.promisify(fs.readFile);

//Variables and Arrays
const questions = [
	{
		message: 'Enter your GitHub username:',
		name: 'username',
	},
	{
		type: 'input',
		message: 'What is your full name?',
		name: 'projectfullname',
	},
	{
		type: 'input',
		message: 'What is your email address?',
		name: 'projectemail',
	},
	{
		type: 'input',
		message: 'What is the title for this project?',
		name: 'projecttitle',
	},
	{
		type: 'input',
		message: 'Please type a description for your project.',
		name: 'projectdes',
	},
	{
		type: 'input',
		message: 'What are the installation instructions for this project?',
		name: 'projectinstall',
	},
	{
		type: 'input',
		message: 'What is the usage information for this project?',
		name: 'projectusageinfo',
	},
	{
		type: 'input',
		message:
			'Who needs to be credited? Did you work with other engineers (add their github pages)? Did you use any third party assets that require attribution? Did you use any tutorials to build this application?',
		name: 'projectcredits',
	},
	{
		type: 'input',
		message: 'What are the contribution guidelines for this project?',
		name: 'projectcontributionguidelines',
	},
	{
		type: 'input',
		message: 'What are the test instructions for this project?',
		name: 'projecttestinstructions',
	},
	{
		type: 'list',
		message: 'What license was used for this project?',
		name: 'projectlicense',
		choices: ['Apache License 2.0', 'GNU GPLv2', 'GNU GPLv3', 'MIT', 'ISC License'],
	},
];

//Functions
function writeToFile(fileName, data) {
	//
	writeFileAsync(fileName, data).then(function () {
		console.log('Readme Successfully Created');
	});
}

function init() {
	inquirer.prompt(questions).then(function (data) {
		console.log(data.projectinstall);
		const projectTitle = data.projecttitle;
		const projectDescription = data.projectdes;
		const projectInstall = data.projectinstall;
		const projecUsage = data.projectusageinfo;
		const projecCredits = data.projectcredits;
		const projectContributions = data.projectcontributionguidelines;
		const projectLicense = data.projectlicense;
		const projectTest = data.projecttestinstructions;
		const githubUsername = data.username;
		const emailAddress = data.projectemail;
		const fullname = data.projectfullname;
		let badge = '';
		let licenseText = '';
		const copywriteYear = moment().format('YYYY');

		//If Statement for License
		if (projectLicense === 'Apache License 2.0') {
			badge = '';
			licenseText = '';
		} else if (projectLicense === 'GNU GPLv2') {
			badge = '';
			licenseText = '';
		} else if (projectLicense === 'GNU GPLv3') {
			badge = '';
			licenseText = '';
		} else if (projectLicense === 'MIT') {
			badge = '![GitHub](https://img.shields.io/github/license/JeffQuit/readmeGen?style=plastic)';
			licenseText = `
			MIT License

			Copyright (c) ${copywriteYear} ${fullname}
			
			Permission is hereby granted, free of charge, to any person obtaining a copy
			of this software and associated documentation files (the "Software"), to deal
			in the Software without restriction, including without limitation the rights
			to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
			copies of the Software, and to permit persons to whom the Software is
			furnished to do so, subject to the following conditions:
			
			The above copyright notice and this permission notice shall be included in all
			copies or substantial portions of the Software.
			
			THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
			IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
			FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
			AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
			LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
			OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
			SOFTWARE.`;
		} else if (projectLicense === 'ISC License') {
			badge = '';
			licenseText = '';
		} else {
			badge = 'N/A';
			licenseText = 'N/A';
		}

		//* Readme Content Below
		const readMeContent = `
# ${projectTitle}

${badge}

## Description
${projectDescription}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Contributing](#contributing)
* [Questions](#questions)

## Installation
${projectInstall}

## Usage
${projecUsage}

## Credits
${projecCredits}

## License
Licensed under the ${licenseText} license. 

## Badges
${projectDescription}

## Contributing
${projectContributions}

## Questions
For any questions related to this applicaiton, please contact me at: ${emailAddress}. \n
Please use this link to access my Github Profile: [https://github.com/${githubUsername}](https://github.com/${githubUsername})

## Tests
${projectTest}`;
		//Call write to file func
		writeToFile('README.md', readMeContent);
	});
}

//
//

//Call Function
init();

//* Bank of script:
/*
inquirer.prompt(questions).then(function ({ username }) {
		const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

		axios.get(queryUrl).then(function (res) {
			const repoNames = res.data.map(function (repo) {
				return repo.name;
			});
			console.log(repoNames);
		});
	});
*/
