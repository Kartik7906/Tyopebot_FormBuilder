const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./Routes/UserRoute');

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

// Constants
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user routes
app.use('/api/users', require('./Routes/UserRoute'));
app.use('/api/folders', require('./Routes/FolderRoute'));
// app.use('/api/forms', require('./Routes/FormRoute'));


// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
})


// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    // Start the server only after successful DB connection
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});