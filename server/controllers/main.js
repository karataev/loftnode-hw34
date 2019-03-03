const storage = require('../storage');
const nodemailer = require('nodemailer');
const config = require('../config.json');

function get(req, res) {
  res.render('index', {
    title: 'Главная',
    skills: storage.getSkills(),
    products: storage.getProducts(),
  });
}

function post(req, res) {
  let {name, email, message} = req.body;

  if (!name || !email || !message) {
    return res.json({ msg: 'Все поля нужно заполнить!', status: 'Error' });
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
      return res.json({
        msg: `При отправке письма произошла ошибка!: ${error}`,
        status: 'Error'
      })
    }
    res.json({ msg: 'Письмо успешно отправлено!', status: 'Ok' })
  })
}

module.exports = {
  get,
  post,
};
