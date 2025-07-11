// const axios = require('axios');
require('dotenv').config();

//! Home 
const Home = (req, res) => {
    return res.status(200).json({ message: 'Welcome to Home Page' });
}

//! About Us 
const About = (req, res) => {
    return res.status(200).json({ message: 'Welcome to About Page' });
}

//! Register
const Register = (req, res) => {
    return res.status(200).json({ message: 'Welcome to Register' });
}

module.exports = {
    Home, About, Register
}