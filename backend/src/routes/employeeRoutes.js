const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
// const { authenticateToken } = require('../middleware/auth');

// Apply authentication middleware to all routes
// router.use(authenticateToken);

// Get all employees
router.get('/', employeeController.getAllEmployees);

// Search employees
router.get('/search', employeeController.searchEmployees);

// Get single employee
router.get('/:id', employeeController.getEmployee);

// Create employee
router.post('/', employeeController.createEmployee);

// Update employee
router.put('/:id', employeeController.updateEmployee);

// Delete employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router; 