const fs = require('fs');
const path = require('path');
const storage = require('../model/storage');
const util = require('util');
const rename = util.promisify(fs.rename);

function get(ctx) {
  if (!ctx.session.isAdmin) {
    ctx.redirect('/login');
    return;
  }
  ctx.render('admin', {
    title: 'Администрация',
    skills: storage.getSkills(),
    msg: ctx.flash('msg')[0],
    msgfile: ctx.flash('msgfile')[0]
  });
}

function postSkills(ctx) {
  let {age, concerts, cities, years} = ctx.request.body;
  storage.saveSkills([age, concerts, cities, years]);
  ctx.flash('msg', 'Обновление прошло успешно');
  ctx.redirect('/admin');
}

async function postProduct(ctx, next) {
  const { name, price } = ctx.request.body;
  const { path: filePath } = ctx.request.files.photo;
  let fileName = path.join(process.cwd(), 'public', 'upload', name);
  const errUpload = await rename(filePath, fileName);
  if (errUpload) {
    ctx.body = {
      mes: 'При загрузке картинки что-то пошло не так...',
      status: 'Error',
    };
    return;
  }
  storage.addProduct(name, price, path.join('upload', name));
  ctx.flash('msgfile', 'Картинка успешно загружена');
  ctx.redirect('/admin');
}

module.exports = {
  get,
  postSkills,
  postProduct,
};
