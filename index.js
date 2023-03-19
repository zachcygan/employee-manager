const fs = require('fs');
const startOptions = require('./src/startMessage');
const mysql = requre('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Rk49FmRk49Fm!',
        database: 'employees_db'
    },
    console.log('Connected to employees_db database')
);

const startMessage = [
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['view all departments',
                  'view all roles',
                  'view all employees',
                  'add a department',
                  'add a role',
                  'add an employee',
                  'update an employee role']
    }
]



const init = () => {
    // let choice = await startOptions(startMessage);

    switch (choice) {
        case 'view all departments':
            console.log('view all departments');
            break;
        case 'view all roles':
            console.log('view all roles');
            break;
        case 'view all employees':
            console.log('view all employees');
            break;
        case 'add a department':
            console.log('add a department');
            break;
        case 'add a role':
            console.log('add a role');
            break;
        case 'add an employee':
            console.log('add an employee');
            break;
        case 'update an employee role':
            console.log('update an employee role');
            break;
    }
}

init();

