const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

// Create an express app
const app = express();

// connect mongodb with mongoose
const dbURI = 'mongodb+srv://sst:r9Q7lxBgKmg7teIV@cluster0.onsjpyy.mongodb.net/Blogs-App?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

// Set ejs view engine
app.set('view engine', 'ejs');

// middleware & static file
app.use(morgan('tiny'));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.use("/blogs", blogRoutes);


// 404 Page
app.use((req, res) => {
    res.status(404).render('404');
});