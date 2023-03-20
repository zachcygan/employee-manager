const fs = require('fs');
const startOptions = require('./src/startMessage');
const mysql = require('mysql2');
const cTable = require('console.table');

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
                  'update an employee role',
                  'quit']
    }
]

async function test() {
    db.query('select * from department', (err, results) => {
        if (err) {
            console.log(err)
        } else {
            const table = cTable.getTable(results)
            console.log(table);
        }
    });
    db.query('select * from role', (err, results) => {
        if (err) {
            console.log(err)
        } else {
            const table = cTable.getTable(results)
            console.log(table);
        }
    });
}

const init = async () => {
    let adding = true;

        console.clear();
        

        while(adding) {
            let choice = await startOptions(startMessage);

            if (choice.choice === 'view all departments') {
                const [row, fields] = await db.promise().query('select * from department')
                
                console.log(fields.map(field => field.name).join('\t'));
                console.log('-'.repeat(50));
                // Print each row of the table
                row.forEach(result => {
                    console.log(Object.values(result).join('\t'));
                    
  });

                // console.log('Viewing all departments: \n');
                // console.log(row)
            } 
    
            if (choice.choice === 'view all roles') {
                const [row, fields] = await db.promise().query('select * from role')
                
                console.log('Viewing all departments: \n');
                console.log(row)
            }

            if (choice.choice === 'quit') {
                adding = false;
            }
        }
    
        // switch (choice.choice) {
        //     case 'view all departments':
        //         db.query('select * from department', (err, results) => {
        //             if (err) {
        //                 console.log(err)
        //             } else {
        //                 const table = cTable.getTable(results)
        //                 console.log(table);
        //             }
        //         });
        //         console.log('Viewing all departments: \n');
        //         break;
        //     case 'view all roles':
        //         console.log('view all roles');
        //         break;
        //     case 'view all employees':
        //         console.log('view all employees');
        //         break;
        //     case 'add a department':
        //         console.log('add a department');
        //         break;
        //     case 'add a role':
        //         console.log('add a role');
        //         break;
        //     case 'add an employee':
        //         console.log('add an employee');
        //         break;
        //     case 'update an employee role':
        //         console.log('update an employee role');
        //         break;
        //     case 'quit':
        //         adding = false;
        //         break;
        //     default:
        //         adding = false;
        //         break;
        // }
    }


init();

