const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ticketRoutes = require('./routes/tickets');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tickets')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Routes
app.use('/api/ticket', ticketRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



