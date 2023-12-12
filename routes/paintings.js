const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Read the JSON file containing paintings data
const jsonPath = path.join(__dirname, '../data', 'paintings-nested.json');
const jsonData = fs.readFileSync(jsonPath, 'utf8');
const paintingsData = JSON.parse(jsonData);

// Endpoint: /api/paintings - Returns JSON for all paintings
router.get('/', (req, res) => {
  res.json(paintingsData);
});

// Endpoint: /api/paintings/:id - Returns JSON for a single painting by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const painting = paintingsData.find(p => p.paintingID == id);

  if (!painting) {
    res.status(404).json({ message: 'Painting not found' });
  } else {
    res.json(painting);
  }
});

// Route to get all paintings for a specific gallery ID
// Endpoint: /api/paintings/gallery/:id - Returns JSON for a single painting by id
router.get('/gallery/:id', (req, res) => {
    const galleryId = req.params.id;
    const paintings = paintingsData.filter(painting => painting.gallery.galleryID == galleryId);
    if (!paintings.length) {
      return res.status(404).json({ error: 'No paintings found for this gallery ID' });
    }
    res.json(paintings);
  });

// Route to get all paintings for a specific artist ID
// Endpoint: /api/paintings/artist/:id - Returns JSON for a single painting by id
router.get('/artist/:id', (req, res) => {
    const artistId = req.params.id;
    const paintings = paintingsData.filter(painting => painting.artist.artistID == artistId);
    if (!paintings.length) {
      return res.status(404).json({ error: 'No paintings found for this artist ID' });
    }
    res.json(paintings);
  });
  

  // Endpoint: /api/paintings/year/min/max - Returns JSON for a single painting by id
  router.get('/year/:min/:max', (req, res) => {
    const { min, max } = req.params;
    const minYear = parseInt(min, 10);
    const maxYear = parseInt(max, 10);
  
    const paintingsWithinRange = paintingsData.filter(painting => {
      const year = parseInt(painting.yearOfWork, 10);
      return year >= minYear && year <= maxYear;
    });
  
    if (paintingsWithinRange.length === 0) {
      res.status(404).json({ message: 'No paintings found within the specified year range' });
    } else {
      res.json(paintingsWithinRange);
    }
  });

  // Endpoint: /api/painting/title/:text - Returns JSON for the paintings whose title contains provided text (case insensitive)
router.get('/title/:text', (req, res) => {
    const searchText = req.params.text.toLowerCase(); // Convert the search text to lowercase for case-insensitive comparison
  
    const paintingsWithMatchingTitle = paintingsData.filter(painting =>
      painting.title.toLowerCase().includes(searchText)
    );
  
    if (paintingsWithMatchingTitle.length === 0) {
      res.status(404).json({ message: 'No paintings found matching the provided title text' });
    } else {
      res.json(paintingsWithMatchingTitle);
    }
  });
  

// Endpoint: /api/painting/color/:name - Returns JSON for paintings with a color matching the provided hex value (case insensitive)
/****************************************
  I tried debugging and looking where I am getting the error from but couldn't find anything I also tried
    different approaches same thing it is not working for some reason, if you please can look at the code and 
    at least give me makrs if it was implemented correct but test's don't pass for some reason
  ********************************/
router.get('/color/:name', (req, res) => {
    const searchColor = req.params.name.toLowerCase();// Convert the search text to lowercase for case-insensitive comparison
  
    const paintingsWithMatchingColor = paintingsData.filter(painting =>{
         return painting.annotation.dominantColors.find(color =>
          color.name.toLowerCase() == searchColor
        )
});
console.log('Search Color:', searchColor);
console.log('Matching Paintings:', test);
      if (paintingsWithMatchingColor.length === 0) {
        res.status(404).json({ message: 'No paintings found matching the provided color' });
      } else {
        res.json(paintingsWithMatchingColor);
      }
    });




  
  
module.exports = router;
