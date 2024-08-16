const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get current user's data, protected route
router.get('/current', validateToken, currentUser);

module.exports = router;
