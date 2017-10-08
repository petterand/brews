const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const config = require('./configs/server-config');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('web/out/'));

app.use(session({
    secret: 'fyrabuggochencocacolaspelardiscopahogmusik',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.Promise = global.Promise;


const Recipe = require('./models/Recipe');

require('./passport')(passport);

app.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/'
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send();
}

app.post('/api/recipe', (req, res) => {
    var newRecipe = req.body;
    var recipe = new Recipe({
        name: newRecipe.name,
        recipe: JSON.stringify(newRecipe)
    });
    recipe.save((err) => {
        if (err) { res.status(500).send({ status: 'error', msg: err }); }
        res.send({ status: 'added' });
    });
});

app.get('/api/recipe', (req, res) => {
    Recipe.find({}).then((recipes) => {
        recipes = recipes.map((item => {
            return {
                name: item.name,
                id: item.name.replace(/\s/g, '_').toLowerCase(),
                recipe: JSON.parse(item.recipe)
            }
        }));
        res.send(recipes);
    }, (err) => {
        res.status(500).send({ status: 'error', msg: err });
    });
});

app.listen(8088, () => {
    console.log('Listening on 8088');
    mongoose.connect(config.db_url, { useMongoClient: true }).then(() => {
        console.log('connected to database');
    }, (err) => {
        console.log("ERR", err);
    });
});

process.on('SIGINT', function () {
    mongoose.disconnect((err) => {
        process.exit(err ? 1 : 0);
    })
});