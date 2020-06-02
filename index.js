//Required Modules
const fs = require('fs');
const axios = require('axios');
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
		choices: ['option 1', 'option 2', 'option 3'],
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

		const readMeContent = `
# ${projectTitle}

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
${projectLicense}

## Badges
${projectDescription}

## Contributing
${projectContributions}

## Questions
For any questions related to this applicaiton, please contact me at: ${emailAddress}
Please use this link to access my Github Profile: [https://github.com/${githubUsername}](https://github.com/${githubUsername})

## Tests
${projectTest}`;
		//Call write to file func
		writeToFile('README.md', readMeContent);
	});
}

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
