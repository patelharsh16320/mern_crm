// const axios = require('axios');
require('dotenv').config();

//! Home 
const Home = (req, res) => {
    return res.status(200).json({ message: 'Welcome to Home Page' });
}

module.exports = {
    Home
}