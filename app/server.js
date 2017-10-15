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

app.post('/api/signout', function (req, res) {
    req.logout();
    res.send({ status: 'loggedout' });
});

app.post('/api/login', passport.authenticate('login'), (req, res) => {
    var user = { name: req.user.name };
    res.send({ status: 'loggedin', user: user });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send();
}

app.get('/api/isAuthenticated', (req, res) => {
    var responseObject = {
        isAuthenticated: req.isAuthenticated()
    };
    if (req.user) {
        responseObject.user = { name: req.user.name };
    }
    res.send(responseObject);
});

app.post('/api/recipe', isLoggedIn, (req, res) => {
    var newRecipe = req.body;
    var recipe = new Recipe({
        id: newRecipe.name.replace(/\s/g, '_').toLowerCase(),
        name: newRecipe.name,
        recipe: JSON.stringify(newRecipe)
    });
    recipe.save((err) => {
        if (err) { return res.status(500).send({ status: 'error', msg: err }); }
        var savedRecipe = {
            id: recipe.id,
            name: recipe.name,
            recipe: JSON.parse(recipe.recipe)
        }
        res.send({ status: 'added', recipe: savedRecipe });
    });
});

app.get('/api/recipe', (req, res) => {
    Recipe.find({}).then((recipes) => {
        recipes = recipes.map((item => {
            return {
                id: item.id,
                name: item.name,
                recipe: JSON.parse(item.recipe)
            }
        }));
        res.send(recipes);
    }, (err) => {
        res.status(500).send({ status: 'error', msg: err });
    });
});

app.delete('/api/recipe/:id', isLoggedIn, (req, res) => {
    var recipeId = req.params.id;
    Recipe.remove({ id: recipeId }).then(() => {
        res.send({ status: 'removed' });
    }, (err) => {
        res.status(500).send({ status: 'error', msg: err });
    });
});

app.listen(8099, () => {
    console.log('Listening on 8099');
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