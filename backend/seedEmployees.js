const mongoose = require('mongoose');
const Employee = require('./models/Employee');

const employees = [
    {
        firstName: 'Sophie',
        lastName: 'Martin',
        email: 'sophie.martin@example.com',
        phone: '0123456789',
        department: 'Technologie',
        position: 'Développeur Frontend',
        hireDate: '2020-04-12',
        salary: 45000,
        status: 'active'
    },
    {
        firstName: 'Lucas',
        lastName: 'Petit',
        email: 'lucas.petit@example.com',
        phone: '0123456788',
        department: 'Technologie',
        position: 'Ingénieur DevOps',
        hireDate: '2019-07-18',
        salary: 55000,
        status: 'onLeave'
    },
    {
        firstName: 'Manon',
        lastName: 'Roux',
        email: 'manon.roux@example.com',
        phone: '0123456787',
        department: 'Administration',
        position: 'Assistante Administrative',
        hireDate: '2019-11-19',
        salary: 35000,
        status: 'terminated'
    }
];

async function seedEmployees() {
    try {
        await mongoose.connect('mongodb://localhost:27017/hrms');
        
        // Clear existing employees
        await Employee.deleteMany({});
        
        // Insert new employees
        const result = await Employee.insertMany(employees);
        console.log('Successfully seeded employees:', result);
        
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding employees:', error);
        process.exit(1);
    }
}

seedEmployees();
