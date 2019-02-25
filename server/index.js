const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const storage = require('./storage');

const PORT = 8080;

storage.init();
let app = express();

app.set('views', path.join(__dirname, '..', 'source', 'template', 'pages'));
app.set('view engine', 'pug');

app.use(
  session({
    secret: 'lolkek',
    key: 'sessionkey',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 10 * 60 * 1000
    },
    saveUninitialized: false,
    resave: false
  })
);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes'));

app.use((req, res, next) => {
  let err = new Error('not found');
  err.status = '404';
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {error: err});
});

app.listen(PORT, () => {
  console.log(`Listen port ${PORT}`);
});
