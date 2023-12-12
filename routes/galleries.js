const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Read the JSON file containing galleries data
const jsonPath = path.join(__dirname, '../data', 'galleries.json');
const jsonData = fs.readFileSync(jsonPath, 'utf8');
const galleriesData = JSON.parse(jsonData);

// Endpoint: /api/galleries - Returns JSON for all galleries
router.get('/', (req, res) => {
  res.json(galleriesData);
});

// Endpoint: /api/galleries/country - Returns JSON for all galleries by country
router.get('/:country', (req, res) => {
    const { country } = req.params;
    const Nationality = galleriesData.filter(c => c.GalleryCountry == country);
  
    if (!Nationality) {
      res.status(404).json({ message: 'Nationality not found' });
    } else {
      res.json(Nationality);
    }
  });

module.exports = router;