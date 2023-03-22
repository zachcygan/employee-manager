const askQuestion = require('./src/askQuestion');

const cTable = require('console.table');
const { up } = require('inquirer/lib/utils/readline');
const roles = [];
const employees = [];
const managers = [];
const deparments = [];
const assignRole = [];

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
                [row, fields] = await db.execute(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager
                                                  FROM employee
                                                  INNER JOIN role ON employee.role_id = role.id 
                                                  INNER JOIN department ON role.department_id = department.id 
                                                  LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER by id`)
                table = cTable.getTable(row)
                console.log(table);
                break;
            case 'add a department':
                let name = await askQuestion(departmentName);
                await db.execute(`INSERT INTO department (name) VALUES (?)`, [name.name])
                console.log(`Added ${name.name} to the database`);
                break;
            case 'add a role':
                deparments.length = 0;

                const departmentOptions = await db.execute(`SELECT name FROM department`);

                for (let i = 0; i < departmentOptions[0].length; i++) {
                    deparments.push(departmentOptions[0][i].name)
                }

                let role = await askQuestion(roleInfo);

                let departmentId = await db.execute('SELECT id FROM department WHERE name=?', [role.department])

                departmentId = departmentId[0][0].id

                await db.execute(`INSERT INTO ROLE (title, salary, department_id) VALUES (?, ?, ?)`, [role.name, role.salary, departmentId])
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

                await db.execute(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                                  VALUES (?, ?, ?, ?)`, [employee.firstName, employee.lastName, roleId, managerId]);
                console.log(`Added ${employee.firstName} ${employee.lastName} to database`)

                break;
            case 'update an employees info':
                let option = await askQuestion(options);

                switch (option.update) {
                    case 'Manager':
                        employees.length = 0;
                        const employeeChoices = await db.execute(`SELECT CONCAT (first_name,' ', last_name) AS fullName, id FROM employee`);

                        for (let i = 0; i < employeeChoices[0].length; i++) {
                            employees.push(employeeChoices[0][i].fullName)
                        }
                        employees.push('null')
                        

                        let managerUpdate = await askQuestion(updateManager)

                        let eId = employeeChoices[0].find(findEmployee => {

                            if (findEmployee.fullName === managerUpdate.employee) {
                                return findEmployee.id
                            }
                        })

                        if (managerUpdate.manager !== 'null') {
                            eId = eId.id
                        } else {
                            eId = eId.id
                            await db.execute(`UPDATE employee SET manager_id = null WHERE id = ?`, [eId])
                            console.log('Updated an employees role');
                            break;
                        }

                        if (managerUpdate.employee === managerUpdate.manager) {
                            console.log('Error. An employee cannot be thier own manger')
                            return;
                        }

                        let mUpdate = employeeChoices[0].find(findManager => {
                            console.log('IN LOOP ' + findManager)

                            if (findManager.fullName === managerUpdate.manager) {
                                return managerUpdate.employee
                            }
                        })

                        
                        mUpdate = mUpdate.id

                        await db.execute(`UPDATE employee SET manager_id = ? WHERE id = ?`, [mUpdate, eId])
                        console.log('Updated an employees role');
                        break;
                    case 'Role':
                        employees.length = 0;
                        const employeeOptions = await db.execute(`SELECT CONCAT (first_name,' ', last_name) AS fullName, id FROM employee`);

                        const updateRole = await db.execute(`SELECT title, id FROM role`);

                        for (let i = 0; i < employeeOptions[0].length; i++) {
                            employees.push(employeeOptions[0][i].fullName)
                        }

                        for (let i = 0; i < updateRole[0].length; i++) {
                            assignRole.push(updateRole[0][i].title)
                        }

                        let update = await askQuestion(updateEmployee)

                        let roleUpdate = updateRole[0].find(findRole => {

                            if (findRole.title === update.role) {
                                return findRole.id
                            }
                        })

                        roleUpdate = roleUpdate.id

                        let id = employeeOptions[0].find(findEmployee => {

                            if (findEmployee.fullName === update.employee) {
                                return findEmployee.id
                            }
                        })

                        id = id.id;

                        await db.execute(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleUpdate, id])
                        console.log('Updated an employees role');

                        break;
                }

                
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
                  'update an employees info',
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
        type: 'list',
        name: 'department',
        message: 'Which department does this role belong to?',
        choices: deparments
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

const updateEmployee = [
    {
        type: 'list',
        name: 'employee',
        message: 'Which employees role do you want to update?',
        choices: employees
    },
    {
        type: 'list',
        name: 'role',
        message: 'Which role do you want to assign to the selected employee?',
        choices: assignRole
    },
]
const updateManager = [
    {
        type: 'list',
        name: 'employee',
        message: 'Which employees manager do you want to update?',
        choices: employees
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Who is their new manager?',
        choices: employees
    }
]

const options = [
    {
        type: 'list',
        name: 'update',
        message: 'Would you like to update the employees role or manager?',
        choices: ['Role', 'Manager']
    }
]
getMysql();
