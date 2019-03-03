const auth = require('../libs/auth');

function get(req, res) {
  if (req.session.isAdmin) {
    res.redirect('/admin');
    return;
  }
  res.render('login', {
    title: 'Авторизация'
  });
}

function post(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  if (auth.isRegisteredUser(email, password)) {
    req.session.isAdmin = true;
    res.redirect('/admin');
  } else {
    res.render('login', {
      msgslogin: 'Пользователь не найден'
    });
  }
}

module.exports = {
  get,
  post,
};
