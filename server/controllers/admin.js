const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const storage = require('../storage');

function get(req, res) {
  res.render('admin', {
    title: 'Администрация',
    skills: storage.getSkills()
  });
}

function postSkills(req, res) {
  let {age, concerts, cities, years} = req.body;
  storage.saveSkills([age, concerts, cities, years]);
  res.redirect('/admin');
}

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

function postProduct(req, res, next) {
  let form = new formidable.IncomingForm();
  let upload = path.join('./public', 'upload');

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
      res.redirect('/admin');
    })
  });
}

module.exports = {
  get,
  postSkills,
  postProduct,
};
