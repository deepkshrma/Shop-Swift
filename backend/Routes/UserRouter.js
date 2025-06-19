const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../Controllers/UserController');
const  ensureAuthenticated  = require('../Middlewares/Auth')


router.get('/',ensureAuthenticated , getAllUsers);


module.exports = router;