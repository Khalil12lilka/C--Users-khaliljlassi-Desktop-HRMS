const mongoose = require('mongoose');
const Employee = require('./models/Employee');

const statusMap = {
  'Actif': 'active',
  'En congé': 'onLeave',
  'Terminé': 'terminated'
};

async function updateStatuses() {
  try {
    await mongoose.connect('mongodb://localhost:27017/hrms');
    const employees = await Employee.find({});
    
    for (const emp of employees) {
      // Add default values for required fields if they're missing
      if (!emp.phone) {
        emp.phone = '000-000-0000'; // Default phone number
      }
      if (!emp.salary) {
        emp.salary = 0; // Default salary
      }
      
      // Update status if it exists in the mapping
      if (statusMap[emp.status]) {
        emp.status = statusMap[emp.status];
      }
      
      await emp.save();
      console.log(`Updated ${emp.firstName} ${emp.lastName} to status ${emp.status}`);
    }
    
    console.log('Status update complete.');
  } catch (error) {
    console.error('Error updating employees:', error);
  } finally {
    await mongoose.disconnect();
  }
}

updateStatuses().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
}); 