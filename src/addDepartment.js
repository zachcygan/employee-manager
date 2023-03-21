const inquirer = require('inquirer');

const addDepartment = async (question) => {
    return inquirer
        .prompt(question)
        .then(val => {
            val = val.name
            console.log(val);

            return val;
        });
}

module.exports = addDepartment;