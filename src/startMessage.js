const inquirer = require('inquirer');

const startOptions = async (question) => {
    return inquirer
        .prompt(question)
        .then(val => {
            
            return val;
        });
}

module.exports = startOptions;