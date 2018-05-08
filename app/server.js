const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const recipe_router = require('./recipe_router');
const temps_router = require('./temps_router');
const batch_router = require('./batch_router');
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

require('./passport')(passport);

app.post('/api/signout', function (req, res) {
   req.logout();
   res.send({ status: 'loggedout' });
});

app.post('/api/login', passport.authenticate('login'), (req, res) => {
   var user = { name: req.user.name };
   res.send({ status: 'loggedin', user: user });
});

app.get('/api/isAuthenticated', (req, res) => {
   var responseObject = {
      isAuthenticated: req.isAuthenticated()
   };
   if (req.user) {
      responseObject.user = { name: req.user.name };
   }
   res.send(responseObject);
});

app.use('/api/recipe', recipe_router);
app.use('/api/temps', temps_router);
app.use('/api/batch', batch_router);

app.listen(8099, () => {
   console.log('Listening on 8099');
   mongoose.connect(config.db_url).then(() => {
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