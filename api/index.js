const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');


// Route includes
const userRouter = require('./routes/user.router');

// Express middleware
app.use(express.json());


/* EXPRESS Routes */
app.use('/api/user', userRouter);

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'build')));

// Correctly handle any requests that don't match the above routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// App Set //
const PORT = process.env.PORT || 5076;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// export your app for vercel
module.exports = app;