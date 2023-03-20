const startOptions = require('./src/startMessage');
const cTable = require('console.table');

const getMysql = async () => {
    const mysql = require('mysql2/promise');

    const db = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'Rk49FmRk49Fm!',
            database: 'employees_db',
        },
        console.log('Connected to employees_db database')
    );

    

    let adding = true;
    while (adding) {
        let choice = await startOptions(startMessage);
        let [row, fields] = '';
        let table = '';
        console.log('\n')

        switch (choice.choice) {
            case 'view all departments':
                [row, fields] = await db.execute('SELECT * from department')
                table = cTable.getTable(row)
                console.log(table);   
                break;
            case 'view all roles':
                [row, fields] = await db.execute('select role.id, role.title, department.name, role.salary from role inner join department on role.department_id=department.id')
                table = cTable.getTable(row)
                console.log(table); 
                break;
            case 'view all employees':
                [row, fields] = await db.execute('select * from employee')
                table = cTable.getTable(row)
                console.log(table); 
                break;
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
            case 'quit':
                adding = false;
                choice.ui.close();
                break;
            default:
                adding = false;
                break;
        }
    }
}


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
    const db = getMysql();
    let adding = true;

    console.clear();


    // while (adding) {
    //     let choice = await startOptions(startMessage);

    //     if (choice.choice === 'view all departments') {
    //         const [row, fields] = await db.query('select * from department')

    //         console.log(fields.map(field => field.name).join('\t'));
    //         console.log('-'.repeat(50));
    //         // Print each row of the table
    //         row.forEach(result => {
    //             console.log(Object.values(result).join('\t'));

    //         });

    //         // console.log('Viewing all departments: \n');
    //         // console.log(row)
    //     }

    //     if (choice.choice === 'view all roles') {
    //         const [row, fields] = await db.promise().query('select * from role')

    //         console.log('Viewing all departments: \n');
    //         console.log(row)
    //     }

    //     if (choice.choice === 'quit') {
    //         adding = false;
    //         break;
    //     }
    // }

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

