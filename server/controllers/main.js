const storage = require('../model/storage');
const nodemailer = require('nodemailer');
const config = require('../config.json');

async function get(ctx) {
  await ctx.render('index', {
    title: 'Главная',
    skills: storage.getSkills(),
    products: storage.getProducts(),
  });
}

async function post(ctx) {
  let {name, email, message} = ctx.request.body;

  if (!name || !email || !message) {
    ctx.body = { msg: 'Все поля нужно заполнить!', status: 'Error' };
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
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      ctx.body = {
        msg: `При отправке письма произошла ошибка!: ${error}`,
        status: 'Error'
      };
      return;
    }
    ctx.body = { msg: 'Письмо успешно отправлено!', status: 'Ok' };
  })
}

module.exports = {
  get,
  post,
};
