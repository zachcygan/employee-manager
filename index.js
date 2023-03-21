const askQuestion = require('./src/askQuestion');

const cTable = require('console.table');
const roles = [];
const managers = [];

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
        let choice = await askQuestion(startMessage);
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
                [row, fields] = await db.execute(`SELECT role.id, role.title, department.name, role.salary 
                                                  FROM role 
                                                  INNER JOIN department ON role.department_id = department.id`)
                table = cTable.getTable(row)
                console.log(table); 
                break;
            case 'view all employees':
                [row, fields] = await db.execute(`SELECT employee.id, employee.first_name, employee.last_name, role.     title, department.name AS department, role.salary, manager.first_name AS manager
                                                  FROM employee
                                                  INNER JOIN role ON employee.role_id = role.id 
                                                  INNER JOIN department ON role.department_id = department.id 
                                                  LEFT JOIN employee manager ON manager.id = employee.manager_id`)
                table = cTable.getTable(row)
                console.log(table);
                break;
            case 'add a department':
                let name = await askQuestion(departmentName);
                await db.execute(`INSERT INTO department (name) VALUES ('?')`, [name])
                console.log(`Added ${name.name} to the database`);
                break;
            case 'add a role':
                let role = await askQuestion(roleInfo);
                await db.execute(`INSERT INTO ROLE (title, salary, department_id) VALUES ('?', ?, ?)`, [role.name, role.salary, role.department])
                console.log(`Added ${role.name} added to database`);
                break;
            case 'add an employee':
                roles.length = 0;
                managers.length = 0;
                
                const roleOptions = await db.execute(`SELECT title FROM role`);
                const managerOptions = await db.execute('SELECT first_name FROM employee')
                

                for (let i = 0; i < roleOptions[0].length; i++) {
                    roles.push(roleOptions[0][i].title)
                }
                for (let i = 0; i < managerOptions[0].length; i++) {
                    managers.push(managerOptions[0][i].first_name)
                }

                

                let employee = await askQuestion(employeeInfo)

                let roleId = await db.execute('SELECT id FROM role WHERE title=?', [employee.role])
                let managerId = await db.execute('SELECT id FROM employee where first_name=?', [employee.manager])
                
                roleId = roleId[0][0].id
                managerId = managerId[0][0].id
                console.log(typeof roleId)
                console.log(typeof managerId)

                await db.execute(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('?', '?', ?, ?)`, [employee.firstName, employee.lastName, mroleId, managerId]);
                console.log(`Added ${employee.firstName} ${employee.lastName} to database`)

                

                break;
            case 'update an employee role':


                // await db.execute(`UPDATE employee SET role_id = ${} WHERE`)
                console.log('Updated an employees role');
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

const departmentName = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department you would like to add?'
    }
]

const roleInfo = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the role?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
    },
    {
        type: 'input',
        name: 'department',
        message: 'What is the department id of the role?'
    },
]

const employeeInfo = [
    {
        type: 'input',
        name: 'firstName',
        message: 'What is the first name of the employee?'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is the last name of the employee?'
    },
    {
        type: 'list',
        name: 'role',
        message: "What is the the employee's role?",
        choices: roles
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Who is the employees manager?',
        choices: managers
    }
]

getMysql();
