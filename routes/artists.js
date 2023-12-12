const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Read the JSON file containing artists data
const jsonPath = path.join(__dirname, '../data', 'artists.json');
const jsonData = fs.readFileSync(jsonPath, 'utf8');
const artistsData = JSON.parse(jsonData);

// Endpoint: /api/artists - Returns JSON for all artists
router.get('/', (req, res) => {
  res.json(artistsData);
});

// Endpoint: /api/artists/:country - Returns JSON for all artists by country
router.get('/:country', (req, res) => {
    const { country } = req.params;
    const Nationality = artistsData.filter(c => c.Nationality == country);
  
    if (!Nationality) {
      res.status(404).json({ message: 'Nationality not found' });
    } else {
      res.json(Nationality);
    }
  });

module.exports = router;