const express = require('express');
const router = express.Router();
const passport = require('passport');

const employeesController = require('../controllers/employee_controller');

router.get('/', passport.isAuthenticated, employeesController.getEmployees)

// update employee
router.post('/update/:id', passport.isAuthenticated, employeesController.update);
// update type of the employee
router.get('/update-type/:id', passport.isAuthenticated, employeesController.updateType);
// remove employee
router.get('/remove/:id', passport.isAuthenticated, employeesController.delete);

module.exports = router;