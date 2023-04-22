const { Router } = require('express');
const {
  
} = require('../controllers/contactController');
const contact = require('../controllers/contactController');
const router = Router();

router.post('/contact' , contact)

module.exports = router;
