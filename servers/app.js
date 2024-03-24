const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// File upload endpoint
app.post('/uploads', upload.single('csvFile'), (req, res) => {
  const filePath = req.file.path;

  // Parse CSV file
  const csvData = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      csvData.push(row);
    })
    .on('end', () => {
      // Send JSON response with CSV data
      res.json({ success: true, data: csvData });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
