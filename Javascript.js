var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/User');

var app = express();

// Database connection
mongoose.connect('mongodb://localhost/pushup_tracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
        console.log('Connected to MongoDB');
    })
    .catch(function (err) {
        console.error('Error connecting to MongoDB', err);
    });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy for authentication
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/dashboard');
});

app.get('/dashboard', isAuthenticated, function (req, res) {
    res.send('Welcome to your dashboard!');
});

app.post('/log-pushup', isAuthenticated, function (req, res) {
    var userId = req.user._id;
    // Code to log push-up count for the user
    res.send('Logged successfully!');
});

// Middleware function to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

app.listen(3000, function () {
    console.log('Server started on port 3000');
});
document.getElementById('pushupButton').addEventListener('click', function() {
    // Send AJAX request to log push-up
    fetch('/log-pushup', {
        method: 'POST',
        credentials: 'same-origin' // Include cookies in request
    })
    .then(response => {
        if (response.ok) {
            console.log('Push-up logged successfully!');
            // Optionally, update UI to reflect push-up logged
        } else {
            console.error('Error logging');
        }
    })
    .catch(error => console.error('Error logging:', error));
});