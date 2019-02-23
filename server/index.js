const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const storage = require('./storage');

const PORT = 8080;

storage.init();
let app = express();

app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

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
  res.render('error.html');
});

app.listen(PORT, () => {
  console.log(`Listen port ${PORT}`);
});
