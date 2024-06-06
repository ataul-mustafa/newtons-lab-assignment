const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviews');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/health', (req, res)=>{
    res.status(200).json({status: "active", message: "Server working finely"})
})

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongodb connected")
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch(err => console.log(err));
