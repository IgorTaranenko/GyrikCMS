const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const keys = require('./config/keys');
const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect(keys.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))

app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('cors')());

app.use('/api/auth', authRoutes);

module.exports = app;