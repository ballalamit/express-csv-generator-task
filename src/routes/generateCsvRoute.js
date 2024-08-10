const express = require('express');
const {generateCsvFile} = require('../controllers/generateCsvController');
const router = express.Router();

router.get('/generate-csv',generateCsvFile);

module.exports = router;
