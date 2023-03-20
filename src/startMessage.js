const inquirer = require('inquirer');

const startOptions = async (question) => {
    return inquirer
        .prompt(question)
        .then(val => {
            console.log('idk')
            return val;
        });
}

module.exports = startOptions;