const {generateCSV} = require('../services/generateCsvService');

const generateCsvFile = async (req, res) => {
    try {
        const csvFilePath = await generateCSV();
        res.json({ csvFilePath });
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate CSV file', error: error.message });
    }
};

module.exports = {generateCsvFile}; 
