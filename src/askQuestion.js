const inquirer = require('inquirer');

const askQuestion = async (question) => {
    return inquirer
        .prompt(question)
        .then(val => {

            return val;
        });
}

module.exports = askQuestion;

