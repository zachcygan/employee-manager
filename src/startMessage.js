const inquirer = require('inquirer');

const startOptions = async (question) => {
    return inquirer
        .promopt(question)
        .then(val => {


            return val;
        })
}

module.export = startOptions;