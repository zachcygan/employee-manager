const inquirer = require('inquirer');

const addRole = async (question) => {
    return inquirer
        .prompt(question)
        .then(val => {

            return val;
        });
}

module.exports = addRole;