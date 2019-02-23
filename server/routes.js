const express = require('express');
const router = express.Router();

const storage = require('./storage');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Главная',
    skills: storage.getSkills(),
  });
});

router.post('/', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let message = req.body.message;
  storage.addFeedback(name, email, message);
  res.send(`You entered ${name}, ${email} and ${message}`);
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(`Auth with ${email}, ${password}`);
  res.redirect('/admin');
});

router.get('/admin', (req, res) => {
  res.render('admin', {
    title: 'Администрация'
  });
});

router.post('/admin/skills', (req, res) => {
  let {age, concerts, cities, years} = req.body;
  storage.saveSkills([age, concerts, cities, years]);
  res.redirect('/');
});

module.exports = router;
