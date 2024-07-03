const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');
const authMiddleware = require('../middleware/middleware');

router.get('/', authMiddleware, fieldController.getFields);
router.get('/all-fields', authMiddleware, fieldController.getAllFields);
router.post('/add-field', authMiddleware, fieldController.addField);
router.post('/search-fields', authMiddleware, fieldController.getFieldsBySearch);


module.exports = router;
