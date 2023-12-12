const express = require('express');
const paintingsRouter = require('./routes/paintings');
const artistsRouter = require('./routes/artists');
const galleriesRouter = require('./routes/galleries');
const app = express();
const PORT = process.env.PORT || 3000;

// Use routers for specific API endpoints
app.use('/api/paintings', paintingsRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/galleries', galleriesRouter);

// Other configurations, error handling, and starting the server
app.use(express.json()); // Parse incoming JSON data

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err); // Log the error details to the console for debugging
    res.status(500).json({ message: 'Internal Server Error' }); // Send a generic error response
  });
  
// Handle 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
