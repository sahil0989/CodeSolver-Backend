const { Router } = require('express');
const {
  register,
  login,htmlfiles
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;
