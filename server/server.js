const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./router/api');
const cors = require('cors');
const logRequests = require('./middleware/loggerMiddleware');

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: false
}));
app.use(logRequests);

app.use(express.json());
const port = process.env.PORT || 3000;
// Routh Path 
app.use(router);

app.listen(port, () => console.log(`server is running on port http://localhost:${port}/`));