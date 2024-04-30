const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/signup', require('./src/routes/signup.routes.js'))
app.use('/api/login', require('./src/routes/login.routes.js'))
app.use('/api/user', require('./src/routes/user.routes.js'))
app.use('/api/todos', require('./src/routes/todos.routes.js'))
app.use('/api/refresh-token', require('./src/routes/refreshToken.routes.js'))
app.use('/api/signout', require('./src/routes/signout.routes.js'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});