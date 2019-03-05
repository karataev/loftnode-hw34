const storage = require('../model/storage');
const nodemailer = require('nodemailer');
const config = require('../config.json');

async function get(ctx) {
  let msg = ctx.flash('msgemail')[0];
  await ctx.render('index', {
    title: 'Главная',
    skills: storage.getSkills(),
    products: storage.getProducts(),
    msgemail: msg
  });
}

function post(ctx) {
  let {name, email, message} = ctx.request.body;

  if (!name || !email || !message) {
    ctx.flash('msgemail', 'Нужно заполнить все поля!');
    ctx.redirect('/');
    return;
  }
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text:
      message.trim().slice(0, 500) +
      `\n Отправлено с: <${email}>`
  };

  return new Promise((res, rej) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        ctx.flash('msgemail', 'При отправке письма произошла ошибка!');
        ctx.redirect('/');
        return res();
      }
      ctx.flash('msgemail', 'Письмо успешно отправлено!');
      ctx.redirect('/');
      return res();
    })
  });
}

module.exports = {
  get,
  post,
};
