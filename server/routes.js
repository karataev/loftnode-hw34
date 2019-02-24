const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const storage = require('./storage');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Главная',
    skills: storage.getSkills(),
    products: storage.getProducts(),
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
  res.render('login', {
    title: 'Авторизация'
  });
});

router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(`Auth with ${email}, ${password}`);
  res.redirect('/admin');
});

router.get('/admin', (req, res) => {
  res.render('admin', {
    title: 'Администрация',
    skills: storage.getSkills()
  });
});

router.post('/admin/skills', (req, res) => {
  let {age, concerts, cities, years} = req.body;
  storage.saveSkills([age, concerts, cities, years]);
  res.redirect('/');
});

router.post('/admin/upload', (req, res, next) => {
  let form = new formidable.IncomingForm();
  let upload = path.join('./public', 'upload');

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, function (err, fields, files) {
    const {name, price} = fields;
    if (err) {
      return next(err);
    }

    const valid = validation(fields, files);

    if (valid.err) {
      fs.unlinkSync(files.photo.path);
      return res.redirect(`/`);
    }

    const fileName = path.join(upload, files.photo.name);

    fs.rename(files.photo.path, fileName, function (err) {
      if (err) {
        console.error(err.message);
        return
      }

      let dir = fileName.substr(fileName.indexOf('\\'));
      storage.addProduct(name, price, dir);
      res.redirect('/');
    })
  });

});

const validation = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Не загружена картинка!', err: true }
  }
  if (!fields.name) {
    return { status: 'Не указано описание картинки!', err: true }
  }
  if (!fields.price) {
    return { status: 'Не указана цена!', err: true }
  }
  return { status: 'Ok', err: false }
};


module.exports = router;
