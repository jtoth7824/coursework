const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'username',
      message: 'What is your user name?',
    },
    {
      type: 'checkbox',
      message: 'What languages do you know?',
      name: 'language',
      choices: ["german", "spanish", "english"],
    },
    {
      type: 'list',
      message: 'What is your preferred method of communication?',
      name: 'communication',
      choices: ['phone', 'email', 'fax'],

    },
  ])
  .then((data) => {
    const filename = `${data.name.toLowerCase().split(' ').join('')}.json`;

    fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) =>
      err ? console.log(err) : console.log('Success!')
    );
  });
