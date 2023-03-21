const inquirer = require('inquirer');

const addEmployee = async (question) => {
    return inquirer
        .prompt(question)
        .then(val => {
            
            return val;
        });
}

module.exports = addEmployee;