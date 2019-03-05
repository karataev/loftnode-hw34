const auth = require('../libs/auth');

async function get(ctx) {
  if (ctx.session.isAdmin) {
    ctx.redirect('/admin');
    return;
  }

  await ctx.render('login', {
    title: 'Авторизация'
  });
}

function post(ctx) {
  let {email, password} = ctx.request.body;
  if (auth.isRegisteredUser(email, password)) {
    ctx.session.isAdmin = true;
    ctx.redirect('/admin');
  } else {
    ctx.render('login', {
      title: 'Авторизация',
      msgslogin: 'Пользователь не найден'
    });
  }
}

module.exports = {
  get,
  post,
};
