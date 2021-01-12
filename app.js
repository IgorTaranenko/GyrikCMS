const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('./config/keys');
const authRoutes = require('./routes/auth');
const categoriesRoutes = require('./routes/category');

const app = express();

mongoose.connect(keys.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));

app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);

module.exports = app;