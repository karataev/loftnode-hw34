const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Pug = require('koa-pug') ;
const session = require('koa-generic-session');
const flash = require('koa-better-flash');

const router = require('./routes');
const storage = require('./model/storage');

const PORT = 8080;

storage.init();

const app = new Koa();
app.keys = ['secret here'];

app.use( async (ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.render('error', {error: err});
  }
});

app.use(koaBody());
app.use(serve('./public') );

const pug = new Pug({
  viewPath: './source/template/pages',
  app: app,
});

app.use(session());
app.use(flash());
app.use(router.routes());

let upload = path.join('./public', 'upload');
if (!fs.existsSync(upload)) fs.mkdirSync(upload);

app.listen(PORT, function() {
  console.log(`Server running on http://localhost:${PORT}`)
});
